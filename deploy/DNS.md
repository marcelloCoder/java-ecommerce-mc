# Domínio + HTTPS (mShop)

Fonte das URLs: [`urls.example.env`](./urls.example.env) → copie para `urls.env` com o domínio real.

## URLs finais (contrato)

| Papel | Host | URL |
|-------|------|-----|
| Loja (SPA) | `www` | `https://www.<domínio>` |
| API | `api` | `https://api.<domínio>` |
| Apex (opcional) | `@` | redirect → `https://www.<domínio>` |

Envs que devem bater com isso:

- Front: `VITE_API_URL=https://api.<domínio>`
- API: `CORS_ORIGINS=https://www.<domínio>`
- API: `PASSWORD_RECOVER_URI=https://www.<domínio>/recover-password/`

## DNS (após comprar / já ter o domínio)

No registrador ou Cloudflare DNS:

| Tipo | Nome | Alvo | Notas |
|------|------|------|--------|
| `CNAME` | `www` | host do front (ex. `cname.vercel-dns.com` ou `*.pages.dev`) | Vercel/Cloudflare Pages mostram o valor exato |
| `CNAME` | `api` | host da API (ex. `xxx.onrender.com`) | Render/Railway/Fly/Cloud Run |
| `A` / `AAAA` ou `CNAME` | `@` | redirect/proxy para `www` | Preferir redirect HTTPS apex → www |

TTL: 300s enquanto valida; depois automático/1h.

## TLS (HTTPS)

| Onde | Como |
|------|------|
| **Cloudflare** (proxy laranja) | Certificado Universal automático; SSL/TLS = Full (strict) se origem também tem cert |
| **Vercel / Cloudflare Pages** | Cert Let’s Encrypt automático ao adicionar o domínio custom |
| **Render / Railway / Fly** | Cert automático no custom domain |
| **Cloud Run + Load Balancer** | Google-managed cert no HTTPS LB |

Checklist:

1. Domínio comprado / nameservers apontando (Cloudflare ou registrador)
2. Registros `www` e `api` criados
3. Domínio custom adicionado no front e na API
4. HTTPS verde em `https://www…` e `https://api…`
5. `urls.env` preenchido e envs aplicados nos deploys
6. Rebuild do front (porque `VITE_API_URL` é build-time)

## Ainda não feito neste repo

- Compra do domínio e login no registrador/Cloudflare (ação manual)
- Apontamento DNS real (precisa do domínio + alvos dos hosts)
- Certificados em produção (gerados pelos provedores após o DNS)

Preencha `deploy/urls.env` com o domínio real e informe o domínio para aplicar os próximos passos (CORS / recover / `VITE_API_URL`).
