# AGENTS.md — mShop Frontend

Fonte principal de orientação para agentes no **front-end** do **mShop**. Siga este arquivo em toda tarefa dentro de `frontend/`. **Não altere o backend** salvo pedido explícito do usuário.

**Marca do produto:** mShop (usar este nome na UI, títulos, header e copy).

### Decisões de MVP (fechadas)

| Tema | Decisão |
|------|---------|
| Escopo | **Loja + Admin** na primeira entrega |
| Idiomas | **Português e inglês** (i18n na UI; seletor de idioma) |
| Imagens | **Gerar assets novos** no estilo Pinterest/moodboard (não depender só do `imgUrl` fraco da API) |
| Catálogo | **Paginação clássica com números** (não infinite scroll) |

---

## 1. Papel

- Agente de **front-end** do **mShop** neste monorepo ecommerce.
- Escopo padrão: apenas `frontend/`. Coordenar com o backend via `APP_PROFILE` (ver § Backend / bancos).
- Responda em **português** (chat). A UI do app deve suportar **pt e en**.
- Implemente só o que a API atual permite; onde o backend não cobre (ex.: estoque, reviews, frete calculado), use UX honesta (estado local, copy informativa ou omita) — **nunca invente endpoints**.
- Prefira mudanças pequenas, focadas e alinhadas à stack, ao mapa de produto e ao **sistema visual masonry** abaixo.

---

## 2. Stack oficial (obrigatória)

| Camada | Tecnologia |
|--------|------------|
| UI | React 19 + TypeScript |
| Build | Vite (porta `5173`) |
| Rotas | React Router (`react-router-dom`) |
| Dados | TanStack Query + Axios |
| Estilo | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) |

Não introduza Next.js, Vue, Redux, CSS-in-JS etc. sem pedido explícito.

### Skills (ler antes de implementar o tema)

| Tema | Skill em `.agents/skills/` |
|------|----------------------------|
| React | `vercel-react-best-practices` |
| TypeScript | `typescript-advanced-types` |
| Vite | `vite` |
| Rotas | `react-router-declarative-mode` |
| Server state | `tanstack-query` |
| CSS | `tailwind-design-system` |
| Forms | `react-hook-form` |
| Validação | `zod` |

Lock: `skills-lock.json`.

---

## 3. Produto (espelho do backend)

**mShop** é a loja **multi-categoria** (seed atual): Electronics, Books, Home & Kitchen, Hardware. Catálogo genérico — a **cara do mShop** é lifestyle/descoberta (moodboard Pinterest), não vitrine fria de marketplace.

### Domínios e regras que o front deve respeitar

| Domínio | O que a API faz | Implicação no front |
|---------|-----------------|---------------------|
| **Categorias** | `GET /categories`, `GET /categories/{id}`; CRUD admin | Navegação, filtros, chips; tiles no feed |
| **Produtos** | `GET /products?name&categoryId&page&size&sort`; `GET /products/{id}`; CRUD admin | Feed masonry, PLP, PDP, busca, admin |
| **Usuários** | `POST /users` (cadastro público); `GET /users/me` (auth); CRUD admin | Registro, perfil, admin |
| **Auth** | `POST /auth/login` + `POST /auth/refresh` (BFF; secret só no backend) → JWT curto + refresh; recover | Login/refresh via BFF — **nunca** secret no browser; guardar `access_token` + `refresh_token`; logout; `/recover-password/:token` |
| **Pedidos** | `POST /orders` (auth); `GET /orders/{id}` (self ou admin) | Checkout autenticado; detalhe; **sem lista** |
| **Pagamento** | Pedido nasce `WAITING_PAYMENT` | Status honesto; sem gateway falso |
| **Roles** | `ROLE_OPERATOR`, `ROLE_ADMIN` | Admin gated |

### Limites do backend

- Carrinho = **client-side** (`localStorage`) até `POST /orders`.
- Sem guest checkout, sem estoque/variantes/reviews/frete/cupom na API.
- Sem `GET /orders` (lista) — só detalhe por id.
- Preço final do pedido vem do servidor.

### Contrato HTTP

- `VITE_API_URL` → `http://localhost:8080`
- Login: `POST /auth/login` com `{ email, password }` (não chamar `/oauth2/token` do SPA)
- Refresh: `POST /auth/refresh` com `{ refresh_token }` (interceptor Axios em 401)
- `src/lib/api.ts` + `src/lib/queryClient.ts`
- Tipar DTOs do backend; não inventar contratos.

### Backend / bancos (não alterar código do backend sem pedido)

O Spring Boot escolhe o banco via `APP_PROFILE` (`spring.profiles.active=${APP_PROFILE:test}`):

| Perfil | Banco | Quando usar |
|--------|--------|-------------|
| `test` (padrão) | **H2** em memória (`application-test.properties`) | Dev rápido / testes; **não** é produção |
| `dev` | **PostgreSQL** local (`application-dev.properties`) | Desenvolvimento com banco original |
| `prod` | **PostgreSQL gerenciado** (`application-prod.properties` + `DATABASE_*`) | Produção: Flyway schema, `ddl-auto=none`, CORS, JWT curto + refresh |

Ao **subir o aplicativo para uso real**, usar `APP_PROFILE=prod`:

```bash
APP_PROFILE=prod ./mvnw spring-boot:run
# Windows PowerShell:
$env:APP_PROFILE="prod"; ./mvnw spring-boot:run
```

O front só consome `VITE_API_URL`; o perfil do backend define banco/CORS/JWT. Ver `backend/README.md`.

---

## 4. Mapa de páginas (sitemap)

### Loja

| Rota | Função |
|------|--------|
| `/` | Home: hero leve + **feed masonry** de descoberta |
| `/products` | PLP em **masonry** (busca, categoria, sort, **paginação numérica**) |
| `/products/:id` | PDP + add to cart |
| `/cart` | Carrinho |
| `/checkout` | Checkout autenticado → `POST /orders` |
| `/orders/:id` | Confirmação / detalhe |
| `/login` `/register` `/forgot-password` `/recover-password/:token` | Auth |
| `/account` | Perfil (`/users/me`) |

### Admin

`/admin`, `/admin/products`, `/admin/categories`, `/admin/users`, `/admin/orders/:id`

---

## 5. Sistema visual oficial (moodboard)

### Arquivos de referência

| Arquivo | Uso |
|---------|-----|
| `design/moodboard/reference-pinterest-masonry.jpg` | **Referência oficial** — layout e “cara” do app |
| `design/moodboard/app-layout-masonry-preview.jpg` | Preview gerado a partir da referência |

Toda UI de descoberta (home + catálogo) deve **parecer este layout**: grade tipo Pinterest (masonry), cards de imagem com alturas variadas, cantos arredondados, gutters limpos, estética lifestyle quente.

### Anatomia do layout (estudo da referência)

1. **Masonry / waterfall** — colunas de largura fixa; altura por aspect ratio da mídia; encaixe orgânico (não grid uniforme 1:1).
2. **Cards** — só a imagem (ou imagem + caption mínima); `border-radius` generoso (~16–24px); sombra quase nula ou muito suave.
3. **Gutters** — espaçamento uniforme e respirável entre pins (~12–20px).
4. **Hover / interações** — overlay discreto no pin (ex.: botão “Salvar” / “Adicionar” no canto); no mobile, tap → PDP ou bottom sheet.
5. **Descoberta em masonry** — visual de feed Pinterest, mas navegação de lista com **paginação clássica numerada** (não infinite scroll).
6. **Header mínimo** — wordmark **mShop** + busca + conta + carrinho; não competir com o feed.
7. **Paleta** — creme/off-white de fundo; verdes oliva; madeira; terracota pontual em CTA; luz natural; texturas (linho, rattan, cerâmica, livro, metal suave).
8. **Fotografia** — lifestyle e contexto > packshot branco; produtos do catálogo devem “entrar” nesse clima (eletrônicos/hardware também em cena natural, não fundo de laboratório).

### Direção de marca (intencional)

**mShop** usa esta direção como cara oficial (pedido explícito via moodboard). Priorize-a sobre qualquer regra genérica que evite “cream + terracotta” — aqui a combinação é **desejada**, desde que bem executada (editorial, não template genérico AI).

Evitar: roxo/indigo SaaS, glow neon, pills excessivos, glassmorphism pesado, layout jornal broadsheet, first viewport com stats/dashboard.

### Tokens sugeridos (CSS variables)

```css
--bg: #f7f1ea;          /* creme papel */
--bg-elevated: #fffdf9;
--ink: #1c1917;         /* texto principal */
--ink-muted: #78716c;
--accent: #c2410c;      /* terracota CTA (Salvar / Comprar) */
--accent-soft: #9a3412;
--nature: #3f6212;      /* oliva */
--wood: #a16207;
--radius-pin: 1.25rem;
--gutter: 0.875rem;
```

Tipografia: display com presença editorial (serif ou semi-serif expressiva para o wordmark **mShop** e títulos) + sans limpa para UI — **não** Inter/Roboto/Arial como face de marca.

---

## 6. Biblioteca de 20 imagens-preset (cara do app)

Use esta lista como **banco pré-definido de visuais** para home, feed, empty states, auth backgrounds e placeholders. Cada item é uma “mudança de cara” derivada do moodboard: mesma linguagem, assunto diferente. Ao gerar ou escolher assets, mantenha luz natural, tons quentes e enquadramento de pin masonry.

| # | ID preset | Cena | Uso sugerido | Categorias tocadas |
|---|-----------|------|--------------|--------------------|
| 01 | `pin-bistro-garden` | Mesa bistrô ferro branco no jardim | Hero / Home | Home & Kitchen |
| 02 | `pin-grass-portrait` | Pessoa deitada na grama, céu aberto | Feed editorial | Lifestyle |
| 03 | `pin-mushroom-bowl` | Mãos com tigela de madeira e cogumelos | Home / food | Home & Kitchen |
| 04 | `pin-green-van` | Van vintage verde em campo | Hero campanha | Lifestyle |
| 05 | `pin-crochet-dress` | Close vestido crochê + sandália | Moda/textura no feed | Lifestyle |
| 06 | `pin-patio-dining` | Pátio com mesa madeira e rattan | Categoria Home | Home & Kitchen |
| 07 | `pin-woven-textiles` | Tecidos coloridos no porta-malas | Cor e textura | Lifestyle |
| 08 | `pin-arched-living` | Sala clara, sofá branco, arco, prateleiras | Home destaque | Home & Kitchen |
| 09 | `pin-reader-armchair` | Pessoa lendo livro (luz natural) | Categoria Books | Books |
| 10 | `pin-poolside-rattan` | Refeição à beira da piscina, cadeiras vime | Verão / Home | Home & Kitchen |
| 11 | `pin-focaccia-flatlay` | Focaccia com tomate e flores (flat lay) | Cozinha / detalhe | Home & Kitchen |
| 12 | `pin-book-stack` | Pilha de livros + poltrona floral | Books PLP header | Books |
| 13 | `pin-rattan-weave` | Close trama rattan / cabeceira | Textura UI / skeleton art | Home |
| 14 | `pin-forest-cabin` | Cabana madeira na floresta | Atmosfera marca | Lifestyle |
| 15 | `pin-cutting-boards` | Tábuas de madeira na parede | Kitchen detail | Home & Kitchen |
| 16 | `pin-desk-device` | Laptop/tablet em escrivaninha madeira + planta | Electronics em lifestyle | Electronics |
| 17 | `pin-audio-soft` | Headphones sobre linho / mesa clara | Electronics soft | Electronics |
| 18 | `pin-kitchen-appliance` | Cafeteira/liquidificador em bancada pedra clara | Home appliances | Home & Kitchen |
| 19 | `pin-hardware-workshop` | Ferramenta/GPU ou peça tech em bancada madeira (luz quente) | Hardware sem cara “cold tech” | Hardware |
| 20 | `pin-shelf-mix` | Prateleira mista: livros + objeto tech + cerâmica | Feed misto multi-categoria | Books + Electronics + Home |

### Regras dos presets / assets

- **MVP:** gerar arquivos de imagem novos no estilo Pinterest (a partir do moodboard) e versioná-los em `public/` / `design/` — não depender das URLs placeholder da API.
- Mapear produtos/categorias aos presets `pin-*`; `imgUrl` da API só como fallback se o asset local não existir.
- Nomes estáveis (`pin-*`); aspect ratios **variados** para o masonry.
- Hover do pin: CTA terracota (“Salvar” opcional / **“Adicionar”** ou ir ao PDP).
- Não forçar as 20 imagens na mesma viewport; rotacionar por seção/página.

### Como o layout se aplica por tela

| Tela | Comportamento visual |
|------|----------------------|
| **Home** | Wordmark **mShop** no header; opcional faixa curta de valor; **feed masonry** como protagonista (não dashboard). Hero tipográfico pode ser slim — o moodboard *é* a vitrine. |
| **PLP `/products`** | Mesmo masonry; filtros em chips/drawer; cada pin = produto (imagem + nome/preço no hover ou caption discreta). |
| **PDP** | Imagem grande editorial; resto do layout limpo; CTA terracota. |
| **Cart / Checkout / Auth** | Mais quietos; mesmos tokens de cor/tipografia; sem masonry obrigatório. |
| **Admin** | Densidade operacional; tokens da marca, sem feed Pinterest. |

---

## 7. UX do funil (ainda obrigatório)

1. Descoberta (Home feed) → 2. Browse (PLP masonry) → 3. PDP → 4. Cart → 5. Checkout auth → 6. Order `WAITING_PAYMENT`  
+ **Admin** completo no MVP (produtos, categorias, usuários, pedido por id).

- Feedback claro de add-to-cart (badge + toast/mini-cart).
- Mobile: 2 colunas masonry; desktop: 4–5 colunas.
- **Paginação:** controle numérico (1, 2, 3…) sincronizado com `page`/`size` da API; sem infinite scroll.
- Loading: skeletons no formato de pins (alturas variadas).
- A11y: foco nos pins, alt text, botões nomeados; não depender só da cor do CTA.
- **i18n:** strings da UI em `pt` e `en` (seletor persistente); moeda/datas conforme locale ativo (`pt-BR` / `en-US`).

Referências de pesquisa (comportamento, não visual): Baymard, NN/g — somadas a esta cara Pinterest/lifestyle.

---

## 8. Estrutura de pastas

```
frontend/
  design/moodboard/   # referências + assets gerados estilo Pinterest
  public/             # pins gerados servidos estaticamente
  src/
    components/       # PinCard, MasonryGrid, Pagination, Shell…
    pages/
    features/         # products, categories, cart, checkout, auth, orders, admin
    i18n/             # pt + en
    hooks/
    lib/
    types/
    App.tsx
    main.tsx
```

---

## 9. Convenções de código

- TypeScript estrito; TanStack Query para server state; carrinho local.
- Forms: Zod + RHF.
- Tailwind + CSS variables do moodboard.
- Componentes: `MasonryGrid`, `PinCard` como base do catálogo.

---

## 10. Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
```

---

## 11. Não fazer

- Alterar backend sem pedido.
- Inventar endpoints / estoque / gateway / lista de pedidos.
- Trocar a cara Pinterest/masonry por grid e-commerce genérico (tiles iguais, fundo branco frio).
- Roxo SaaS, neon, clutter de dashboard no first viewport.
- Commit/push sem pedido; secrets no código.

---

## 12. Checklist por tarefa

1. Cabe em `frontend/` e respeita a API?
2. A UI de descoberta ainda parece o moodboard (`design/moodboard/`)?
3. Pins usam aspect ratios variados e tokens da marca?
4. Skill da stack consultada?
5. Loading / vazio / erro / feedback de carrinho ok?
6. Tipagem DTO ok? Build/lint ok?
7. Resposta em português, direta.
