# mShop

**mShop** é um e-commerce de descoberta lifestyle: vitrine visual no estilo feed (inspirado em Pinterest), com compra autenticada e área administrativa, em **português** e **inglês**.

Não é uma loja genérica — o foco é explorar produtos (eletrônicos, livros, casa & cozinha e hardware) com fotografia lifestyle, grade masonry e identidade quente (creme, oliva, madeira, terracota).

---

## Acessar a loja

| Ambiente | URL |
|----------|-----|
| **Produção (demo)** | **https://mshop-flame.vercel.app** |
| Local (Vite) | http://localhost:5173 |
| Local (Docker) | http://localhost:8081 |

Abra a demo em: [https://mshop-flame.vercel.app](https://mshop-flame.vercel.app)

A API de produção é provisionada à parte (ex.: Render + PostgreSQL Neon). Em ambiente local a API roda em `http://localhost:8080`.

---

## O que o aplicativo faz

### Para o cliente

- **Home em feed** — descoberta visual de produtos  
- **Catálogo masonry** — grade com alturas variáveis e paginação numérica  
- **Página do produto** — detalhes e adicionar ao carrinho  
- **Carrinho** — itens guardados no navegador até o checkout  
- **Checkout autenticado** — login ou cadastro obrigatório  
- **Pedido** — criação com status `WAITING_PAYMENT` e consulta por id  
- **Conta** — acesso à área do usuário  
- **Recuperação de senha** — fluxo por e-mail  

### Para a operação (admin)

Painel em `/admin` (perfil administrador) para gerir **produtos**, **categorias**, **usuários** e **pedidos**.

### Categorias

Electronics · Books · Home & Kitchen · Hardware

### Jornada

```text
Home → Catálogo → Produto → Carrinho → Login/Cadastro → Checkout → Pedido
```

---

## Stack (visão geral)

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | React 19, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS v4, i18n (pt/en) |
| **Backend** | Spring Boot 3.2, Java 21, JPA, Flyway, Spring Security + OAuth2 (JWT) |
| **Banco** | H2 (testes) · PostgreSQL local (dev) · PostgreSQL gerenciado / Neon (prod) |
| **Deploy** | Front na **Vercel** · API via Docker (**Render**) · DNS/TLS documentados em `deploy/` |

---

## Estrutura do monorepo

```text
ecommerce/
├── frontend/     # SPA mShop (React + Vite)
├── backend/      # API REST (Spring Boot)
├── deploy/       # URLs, DNS/TLS e env de produção (exemplos)
├── scripts/      # Utilitários (prod local, bootstrap, testes)
├── docker-compose.yml
├── render.yaml   # Blueprint da API no Render
└── README.md
```

| Pasta | Conteúdo |
|-------|----------|
| [`frontend/`](./frontend/) | Loja, carrinho, checkout, i18n e admin |
| [`backend/`](./backend/) | Catálogo, auth BFF, pedidos, e-mail de recover |
| [`deploy/`](./deploy/) | Contrato de URLs e guia DNS ([`DNS.md`](./deploy/DNS.md)) |

---

## Como rodar localmente

### Opção A — Docker (stack completa)

```bash
docker compose up --build
```

| Serviço | URL |
|---------|-----|
| Loja | http://localhost:8081 |
| API | http://localhost:8080 |
| Mailpit (e-mails) | http://localhost:8025 |
| Postgres | `localhost:5433` |

### Opção B — Desenvolvimento separado

```bash
# Terminal 1 — API (JDK 21). Padrão: H2 em memória
cd backend
./mvnw spring-boot:run

# Terminal 2 — loja
cd frontend
npm install
npm run dev
```

- Loja: http://localhost:5173  
- API: http://localhost:8080  

Para PostgreSQL local no backend: `APP_PROFILE=dev` (ver [`backend/README.md`](./backend/README.md)).

Usuários de demonstração nos seeds (senha tipicamente `123456`): `alice@example.com` (cliente), `bob@example.com` (admin).

---

## Identidade visual

Moodboard **Pinterest / masonry lifestyle**:

- Pins arredondados, gutters limpos, hover com CTA terracota  
- Header enxuto: **mShop**, busca, conta, carrinho  
- Assets `pin-*` em `frontend/public/pins/`  
- Referências: `frontend/design/moodboard/`  

---

## Escopo do MVP

**Incluído:** loja completa (descoberta → pedido), admin, i18n pt/en, autenticação e recuperação de senha.

**Fora do escopo atual:** checkout sem conta, gateway de pagamento, estoque, avaliações e lista completa de pedidos do cliente.

---

## Documentação técnica

- Frontend: [`frontend/README.md`](./frontend/README.md) · [`frontend/AGENTS.md`](./frontend/AGENTS.md)  
- Backend: [`backend/README.md`](./backend/README.md)  
- Deploy / DNS: [`deploy/DNS.md`](./deploy/DNS.md)  
- CI: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)  

---

© mShop — e-commerce de descoberta lifestyle.
