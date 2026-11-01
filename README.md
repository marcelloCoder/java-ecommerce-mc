# mShop

**mShop** é uma loja digital de descoberta lifestyle: um e-commerce pensado para explorar produtos com a mesma fluidez de um feed visual — elegante, inspirador e fácil de navegar.

A experiência combina catálogo visual, compra autenticada e área administrativa, em português e inglês.

---

## Para quem é

Clientes que buscam uma vitrine moderna — eletrônicos, livros, casa & cozinha e hardware — apresentada com estética lifestyle (fotografia, cores quentes, grade tipo Pinterest), sem a sensação de uma loja fria ou genérica.

---

## O que o aplicativo oferece

### Loja

- **Home em feed** — descoberta visual de produtos
- **Catálogo masonry** — grade com alturas variáveis e paginação numérica
- **Página do produto (PDP)** — detalhes para decidir a compra
- **Carrinho** — seleção de itens até o checkout
- **Checkout autenticado** — pedido com login ou cadastro
- **Conta** — acesso seguro à loja

### Administração

Painel para gestão de **produtos**, **categorias** e **usuários**, alinhado à operação da loja.

### Idiomas

Interface em **português** e **inglês**, com seletor de idioma.

### Categorias

| Categoria        | Foco                          |
|------------------|-------------------------------|
| Electronics      | Tecnologia no dia a dia       |
| Books            | Leitura e lifestyle           |
| Home & Kitchen   | Casa, mesa e cozinha          |
| Hardware         | Utilitários e ferramentas     |

---

## Jornada do cliente

```text
Home (feed) → Catálogo → Produto → Carrinho → Checkout → Pedido
```

1. Explorar o feed ou buscar no catálogo  
2. Abrir o produto e adicionar ao carrinho  
3. Entrar ou criar conta  
4. Finalizar o pedido  

---

## Estrutura do projeto

```text
ecommerce/
├── frontend/   # Interface web (React) — a loja mShop
├── backend/    # API (Spring Boot) — catálogo, auth e pedidos
└── README.md   # Este documento
```

| Pasta | Conteúdo |
|-------|----------|
| [`frontend/`](./frontend/) | SPA do mShop: vitrine, carrinho, checkout e admin |
| [`backend/`](./backend/) | API REST: produtos, usuários, autenticação e pedidos |

Detalhes técnicos de cada parte estão nos respectivos READMEs.

---

## Como experimentar (visão geral)

1. Subir a **API** (`backend`)  
2. Subir a **loja** (`frontend`)  
3. Abrir a aplicação no navegador (por padrão, `http://localhost:5173`)

### Docker (stack completa)

```bash
docker compose up --build
```

- Loja: http://localhost:8081  
- API: http://localhost:8080  
- Mailpit (e-mails de recover): http://localhost:8025  

CI em `.github/workflows/ci.yml`. Detalhes de staging/Neon/SMTP em [`backend/README.md`](./backend/README.md).

**Front em produção:** Vercel ou Cloudflare Pages — ver seção *Deploy* em [`frontend/README.md`](./frontend/README.md) (`VITE_API_URL` = URL pública da API).

**Domínio + HTTPS:** [`deploy/DNS.md`](./deploy/DNS.md) — URLs finais em [`deploy/urls.example.env`](./deploy/urls.example.env).

Instruções passo a passo, requisitos e perfis de banco: veja [`frontend/README.md`](./frontend/README.md) e [`backend/README.md`](./backend/README.md).

---

## Identidade visual

O mShop segue um moodboard **Pinterest / masonry lifestyle**:

- Grade visual com pins arredondados  
- Paleta creme, oliva, madeira e terracota  
- Fotografia lifestyle (não só foto de produto em fundo branco)  
- Header enxuto: marca **mShop**, busca, conta e carrinho  

Referências de design: `frontend/design/moodboard/`.

---

## Escopo do MVP

Incluído:

- Loja completa (descoberta → pedido)  
- Área admin  
- i18n (pt / en)  
- Autenticação e recuperação de senha  

Fora do escopo atual (comportamento honesto, sem inventar regras):

- Checkout sem conta (guest)  
- Gateway de pagamento externo  
- Controle de estoque e avaliações de produto  
- Lista completa de pedidos do cliente (há detalhe por id do pedido)  

---

## Contato e documentação técnica

- **Frontend:** [frontend/README.md](./frontend/README.md)  
- **Backend / API:** [backend/README.md](./backend/README.md)  

---

© mShop — e-commerce de descoberta lifestyle.
