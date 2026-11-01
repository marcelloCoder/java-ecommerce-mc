# mShop — Frontend

SPA do e-commerce **mShop**. Consome a API Spring Boot deste monorepo **sem alterá-la**.

Guia completo para agentes e implementação: [`AGENTS.md`](./AGENTS.md).

**Marca:** mShop

## Decisões de MVP

- **Escopo:** loja completa **e** área **admin**
- **Idiomas:** português e inglês (i18n + seletor)
- **Imagens:** gerar assets novos no estilo Pinterest (moodboard); não depender só do `imgUrl` da API
- **Catálogo:** paginação clássica com números (sem infinite scroll)

## Backend — banco teste vs produção

O backend Spring Boot usa `APP_PROFILE` (padrão `test`):

| Perfil | Banco | Uso |
|--------|--------|-----|
| `test` | H2 em memória | Testes / dev rápido — **não** usar em produção |
| `dev` | PostgreSQL local (`localhost:5432/dscatalog`) | Desenvolvimento |
| `prod` | PostgreSQL gerenciado (`DATABASE_*`) | **Produção** (CORS, recover URI, JWT curto + refresh) |

```bash
# PowerShell — produção
$env:APP_PROFILE="prod"; ./mvnw spring-boot:run
```

O front só aponta para a API (`VITE_API_URL`); quem troca o banco/perfil é o backend. Detalhes em `AGENTS.md` e `backend/README.md`.

## Cara do app (obrigatória)

A interface de descoberta do **mShop** deve seguir o moodboard tipo **Pinterest / masonry lifestyle**:

| Arquivo | Descrição |
|---------|-----------|
| [`design/moodboard/reference-pinterest-masonry.jpg`](./design/moodboard/reference-pinterest-masonry.jpg) | Referência oficial |
| [`design/moodboard/app-layout-masonry-preview.jpg`](./design/moodboard/app-layout-masonry-preview.jpg) | Preview da cara do app |

### Layout

- Grade **masonry** (colunas fixas, alturas variáveis)
- Pins com cantos arredondados (~16–24px) e gutters limpos
- Hover com CTA terracota (Salvar / Adicionar / abrir produto)
- Header mínimo (**mShop**, busca, conta, carrinho)
- Fundo creme; oliva, madeira e terracota; fotografia lifestyle
- Mobile ~2 colunas · Desktop ~4–5 colunas · sensação de feed contínuo

### 20 presets de imagem (banco visual)

**MVP:** gerar arquivos reais a partir destes IDs (estilo Pinterest). Derivados da referência — feed, heroes, fallbacks e atmosferas:

1. `pin-bistro-garden` — bistrô no jardim  
2. `pin-grass-portrait` — retrato na grama  
3. `pin-mushroom-bowl` — tigela de madeira / cogumelos  
4. `pin-green-van` — van vintage no campo  
5. `pin-crochet-dress` — crochê + sandália  
6. `pin-patio-dining` — pátio madeira/rattan  
7. `pin-woven-textiles` — tecidos coloridos  
8. `pin-arched-living` — sala com arco e sofá claro  
9. `pin-reader-armchair` — leitura (Books)  
10. `pin-poolside-rattan` — mesa à beira da piscina  
11. `pin-focaccia-flatlay` — flat lay de cozinha  
12. `pin-book-stack` — pilha de livros  
13. `pin-rattan-weave` — close de rattan  
14. `pin-forest-cabin` — cabana na floresta  
15. `pin-cutting-boards` — tábuas de madeira  
16. `pin-desk-device` — laptop/tablet lifestyle (Electronics)  
17. `pin-audio-soft` — headphones em linho (Electronics)  
18. `pin-kitchen-appliance` — eletro em bancada clara  
19. `pin-hardware-workshop` — hardware/tech em madeira quente  
20. `pin-shelf-mix` — prateleira mista multi-categoria  

Detalhes de uso por categoria e tokens CSS: seção **Sistema visual** em `AGENTS.md`.

## Visão do produto

**mShop** — loja digital de descoberta lifestyle (UI em **pt** e **en**).

Funil: **Home (feed) → Catálogo masonry (paginação numérica) → PDP → Carrinho → Checkout autenticado → Pedido** + **Admin**.

Categorias da API: Electronics, Books, Home & Kitchen, Hardware — apresentadas com a estética lifestyle acima (não vitrine fria).

### API (espelho)

- Catálogo paginado (`name`, `categoryId`), detalhe de produto  
- Cadastro, login JWT, recuperação de senha  
- Pedido autenticado (`WAITING_PAYMENT`) + detalhe por id  
- Admin: produtos, categorias, usuários  

### Limites (sem mudar backend)

| Limitação | Front |
|-----------|--------|
| Sem API de carrinho | Estado local até o checkout |
| Sem guest checkout | Login/cadastro obrigatório |
| Sem lista de pedidos | Só `/orders/:id` |
| Sem gateway / estoque / reviews | UX honesta; sem inventar regras |

## Stack

React 19 · TypeScript · Vite (`5173`) · React Router · TanStack Query · Axios · Tailwind CSS v4 · React Hook Form · Zod  

Skills: `.agents/skills/` (`skills-lock.json`).

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

`VITE_API_URL` → `http://localhost:8080` (ver `.env.example`).

### Deploy (Vercel / Cloudflare Pages)

SPA estática (`dist/`). Em build, defina **`VITE_API_URL`** com a URL pública HTTPS da API (contrato: [`../deploy/urls.example.env`](../deploy/urls.example.env)). Sem isso, o front aponta para `localhost` e quebra em produção. DNS/TLS: [`../deploy/DNS.md`](../deploy/DNS.md).

| Plataforma | Config no repo | Root / build |
|------------|----------------|--------------|
| **Vercel** | `vercel.json` (rewrite SPA → `index.html`) | Root Directory: `frontend` · Build: `npm run build` · Output: `dist` |
| **Cloudflare Pages** | `public/_redirects` (`/* → /index.html` 200) | Root: `frontend` · Build: `npm run build` · Output: `dist` |

```bash
# Vercel (CLI) — na pasta frontend
npx vercel login
npx vercel --prod --env VITE_API_URL=https://URL_PUBLICA_DA_API
# ou: defina VITE_API_URL no dashboard (Production + Preview) e rode npx vercel --prod
```

Depois do domínio do mShop: atualize `CORS_ORIGINS` e `PASSWORD_RECOVER_URI` no backend para a URL do front.

### Subir full stack

```bash
# Terminal 1 — API (H2 teste) — requer JDK 21
cd backend
./mvnw spring-boot:run

# Produção/PostgreSQL:
# $env:APP_PROFILE="dev"; ./mvnw spring-boot:run

# Terminal 2 — mShop
cd frontend
npm run dev
```

Usuários seed (senha tipicamente `123456` no dataset DevSuperior): `alice@example.com`, `bob@example.com` (admin), etc.

Assets locais: `public/pins/pin-*.jpg` (20 presets).

## Top 20 e-commerces mais comuns (tráfego global)

Fonte: ranking de visitas mensais (We Are Social / Visual Capitalist, jun–ago 2025). Referência de mercado para o projeto:

- amazon.com
- temu.com
- aliexpress.com
- ebay.com
- ozon.ru
- amazon.co.jp
- walmart.com
- amazon.in
- rakuten.co.jp
- amazon.de
- etsy.com
- amazon.co.uk
- coupang.com
- mercadolivre.com.br
- target.com
- flipkart.com
- amazon.com.br
- rakuten.com
- shop.app
- ticketmaster.com

## Implementação

Ordem sugerida: shell/header + i18n → gerar assets `pin-*` → `MasonryGrid`/`PinCard`/`Pagination` → home → PLP → PDP → carrinho → auth → checkout → admin — fiel ao moodboard, com backend em `APP_PROFILE=prod` quando for ambiente real.
