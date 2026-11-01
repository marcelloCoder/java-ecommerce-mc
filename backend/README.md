# Projeto Java Ecommerce (API do mShop)

## System Design

https://docs.google.com/document/d/1NyeNLifgQWQUHqmasNyU_2uFunFz7ikdoXg75TyMFc4/edit?tab=t.0#heading=h.aqcqt9jknaf1

## Perfis de banco de dados

O perfil ativo vem de `APP_PROFILE` (`application.properties`: `spring.profiles.active=${APP_PROFILE:test}`).

| Perfil | Arquivo | Banco | Uso |
|--------|---------|--------|-----|
| `test` (padrão) | `application-test.properties` | **H2** em memória (`jdbc:h2:mem:testdb`) | Testes / dev rápido. Hibernate + `import.sql`. **Não** é produção. |
| `dev` | `application-dev.properties` | **PostgreSQL** local (`localhost:5432/dscatalog`) | Desenvolvimento: Flyway schema + seed demo. |
| `prod` | `application-prod.properties` | **PostgreSQL gerenciado** via `DATABASE_*` | Produção: Flyway **só schema**, `ddl-auto=none`, CORS, JWT curto + refresh. |

### Flyway (Postgres)

| Local | Conteúdo |
|-------|----------|
| `db/migration/V1__create_schema.sql` | DDL das tabelas (`tb_*`) |
| `db/seed/V2__seed_demo_data.sql` | Dados demo (só `dev`) |

- `prod` → `classpath:db/migration` (banco vazio sobe limpo; crie o admin depois)
- `dev` → migration + seed
- `test` → Flyway desligado (H2)
- `baseline-on-migrate=true` — banco Postgres já existente sem histórico Flyway é baselined na V1 (não recria tabelas)

### Subir com banco de teste (H2)

```bash
# padrão — APP_PROFILE=test
./mvnw spring-boot:run
```

### Subir com PostgreSQL local (dev)

```bash
# PowerShell
$env:APP_PROFILE="dev"; ./mvnw spring-boot:run

# bash
APP_PROFILE=dev ./mvnw spring-boot:run
```

### Subir em produção (`prod`)

Exige Postgres gerenciado e variáveis de ambiente (não use defaults de exemplo em produção real):

```bash
# PowerShell (exemplo)
$env:APP_PROFILE="prod"
$env:DATABASE_URL="jdbc:postgresql://SEU_HOST:5432/mshop"
$env:DATABASE_USERNAME="mshop"
$env:DATABASE_PASSWORD="***"
$env:CORS_ORIGINS="https://www.seudominio.com"
$env:PASSWORD_RECOVER_URI="https://www.seudominio.com/recover-password/"
$env:CLIENT_ID="..."
$env:CLIENT_SECRET="..."
$env:JWT_DURATION="900"
$env:JWT_REFRESH_DURATION="604800"
./mvnw spring-boot:run
```

Em produção use **sempre** `APP_PROFILE=prod`, nunca H2 (`test`) nem credenciais hardcoded de `dev`.

### Domínio + HTTPS

Contrato de URLs e DNS/TLS: [`deploy/DNS.md`](../deploy/DNS.md) + [`deploy/urls.example.env`](../deploy/urls.example.env).

Após o domínio real (`www` + `api` com TLS): alinhar `CORS_ORIGINS`, `PASSWORD_RECOVER_URI` e o `VITE_API_URL` do front.

### Staging gerenciado (Neon)

1. Provisionar (projeto claimable temporário, sem conta):

```bash
npx neonctl@latest claim create --region-id aws-us-east-2 --file .env.staging
```

2. Completar `.env.staging` com JDBC (`SPRING_DATABASE_URL`) + `CLIENT_*` / `CORS_*` — ver `.env.staging.example`.
3. Subir a API:

```powershell
./scripts/run-staging.ps1
```

4. Após o Flyway (`V1`), bootstrap admin + catálogo mínimo:

```powershell
# com PGHOST/PGUSER/PGPASSWORD/PGDATABASE/PGSSLMODE apontando ao Neon
psql -f scripts/staging-bootstrap.sql
```

Admin bootstrap: `admin@mshop.staging` / `123456` (trocar em staging real).  
`.env.staging` é gitignored. Projetos `neon claim` expiram se não forem reivindicados:

```bash
npx neonctl@latest claim accept
```

### E-mail / recuperação de senha

| Ambiente | SMTP |
|----------|------|
| Docker Compose | **Mailpit** (`localhost:8025` UI, `1025` SMTP) |
| Staging rápido | **Ethereal** (sandbox) via `EMAIL_*` no `.env.staging` |
| Produção | SMTP real (SES, Resend, SendGrid, Gmail app password) |

Variáveis: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USERNAME`, `EMAIL_PASSWORD`, `EMAIL_SMTP_AUTH`, `EMAIL_SMTP_STARTTLS`, `PASSWORD_RECOVER_URI`.

Teste automatizado (API no ar + PG* apontando ao banco):

```powershell
../scripts/test-password-recover.ps1
```

### Docker / CI

Na raiz do monorepo:

```bash
docker compose up --build
```

- API: `http://localhost:8080`
- Front: `http://localhost:8081`
- Mailpit: `http://localhost:8025`
- Postgres: `localhost:5433`

CI: `.github/workflows/ci.yml` (Maven test, front build, docker build).

### Auth (BFF)

| Endpoint | Uso |
|----------|-----|
| `POST /auth/login` | `{ email, password }` → access + refresh token |
| `POST /auth/refresh` | `{ refresh_token }` → novo access (+ refresh rotacionado) |

O backend troca no `/oauth2/token` com `CLIENT_ID` / `CLIENT_SECRET` **somente no servidor**. Não exponha o client secret no front.

- Access token: curto em `prod` (padrão **900s** / 15 min)
- Refresh token: padrão **7 dias**, com rotação (`reuseRefreshTokens=false`)

Front-end: ver `frontend/README.md` e `frontend/AGENTS.md`.
