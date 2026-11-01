export type Dict = {
  brand: string
  nav: {
    home: string
    products: string
    cart: string
    account: string
    login: string
    register: string
    logout: string
    admin: string
    search: string
  }
  home: {
    eyebrow: string
    title: string
    subtitle: string
    cta: string
    trust1: string
    trust2: string
    trust3: string
    trust4: string
    featured: string
    categories: string
  }
  products: {
    title: string
    filters: string
    allCategories: string
    sort: string
    sortName: string
    sortPrice: string
    empty: string
    clearFilters: string
    page: string
    of: string
    results: string
  }
  product: {
    addToCart: string
    added: string
    categories: string
    description: string
    back: string
  }
  cart: {
    title: string
    empty: string
    continue: string
    checkout: string
    quantity: string
    remove: string
    subtotal: string
    shippingNote: string
  }
  checkout: {
    title: string
    needLogin: string
    confirm: string
    summary: string
    placing: string
  }
  order: {
    title: string
    status: string
    total: string
    items: string
    moment: string
    waiting: string
    paid: string
    shipped: string
    delivered: string
    canceled: string
  }
  auth: {
    loginTitle: string
    registerTitle: string
    email: string
    password: string
    name: string
    phone: string
    birthDate: string
    submitLogin: string
    submitRegister: string
    forgot: string
    noAccount: string
    hasAccount: string
    forgotTitle: string
    forgotSubmit: string
    forgotSent: string
    recoverTitle: string
    recoverSubmit: string
    recoverDone: string
  }
  account: {
    title: string
    roles: string
  }
  admin: {
    title: string
    products: string
    categories: string
    users: string
    orders: string
    create: string
    edit: string
    delete: string
    save: string
    cancel: string
    name: string
    description: string
    price: string
    imgUrl: string
    actions: string
    lookupOrder: string
    orderId: string
    confirmDelete: string
  }
  common: {
    loading: string
    error: string
    save: string
    language: string
    previous: string
    next: string
  }
}

export const pt: Dict = {
  brand: 'mShop',
  nav: {
    home: 'Início',
    products: 'Catálogo',
    cart: 'Carrinho',
    account: 'Conta',
    login: 'Entrar',
    register: 'Criar conta',
    logout: 'Sair',
    admin: 'Admin',
    search: 'Buscar produtos…',
  },
  home: {
    eyebrow: 'Descubra o mShop',
    title: 'Compras com alma de descoberta',
    subtitle:
      'Electronics, livros, casa e hardware em um feed visual quente — estilo Pinterest, compra de verdade.',
    cta: 'Ver catálogo',
    trust1: 'Compra segura',
    trust2: 'Conta e pedidos',
    trust3: 'Categorias reais',
    trust4: 'Checkout autenticado',
    featured: 'Em destaque',
    categories: 'Explore por categoria',
  },
  products: {
    title: 'Catálogo',
    filters: 'Filtros',
    allCategories: 'Todas as categorias',
    sort: 'Ordenar',
    sortName: 'Nome',
    sortPrice: 'Preço',
    empty: 'Nenhum produto encontrado.',
    clearFilters: 'Limpar filtros',
    page: 'Página',
    of: 'de',
    results: 'resultados',
  },
  product: {
    addToCart: 'Adicionar ao carrinho',
    added: 'Adicionado ao carrinho',
    categories: 'Categorias',
    description: 'Descrição',
    back: 'Voltar ao catálogo',
  },
  cart: {
    title: 'Carrinho',
    empty: 'Seu carrinho está vazio.',
    continue: 'Continuar comprando',
    checkout: 'Finalizar compra',
    quantity: 'Qtd.',
    remove: 'Remover',
    subtotal: 'Subtotal',
    shippingNote: 'Frete calculado no momento da entrega (se aplicável).',
  },
  checkout: {
    title: 'Checkout',
    needLogin: 'Faça login para finalizar o pedido.',
    confirm: 'Confirmar pedido',
    summary: 'Resumo',
    placing: 'Enviando…',
  },
  order: {
    title: 'Pedido',
    status: 'Status',
    total: 'Total',
    items: 'Itens',
    moment: 'Data',
    waiting: 'Aguardando pagamento',
    paid: 'Pago',
    shipped: 'Enviado',
    delivered: 'Entregue',
    canceled: 'Cancelado',
  },
  auth: {
    loginTitle: 'Entrar no mShop',
    registerTitle: 'Criar conta',
    email: 'E-mail',
    password: 'Senha',
    name: 'Nome',
    phone: 'Telefone',
    birthDate: 'Data de nascimento',
    submitLogin: 'Entrar',
    submitRegister: 'Cadastrar',
    forgot: 'Esqueci a senha',
    noAccount: 'Não tem conta?',
    hasAccount: 'Já tem conta?',
    forgotTitle: 'Recuperar senha',
    forgotSubmit: 'Enviar link',
    forgotSent: 'Se o e-mail existir, enviamos as instruções.',
    recoverTitle: 'Nova senha',
    recoverSubmit: 'Salvar senha',
    recoverDone: 'Senha atualizada. Faça login.',
  },
  account: {
    title: 'Minha conta',
    roles: 'Perfis',
  },
  admin: {
    title: 'Admin mShop',
    products: 'Produtos',
    categories: 'Categorias',
    users: 'Usuários',
    orders: 'Pedido por ID',
    create: 'Criar',
    edit: 'Editar',
    delete: 'Excluir',
    save: 'Salvar',
    cancel: 'Cancelar',
    name: 'Nome',
    description: 'Descrição',
    price: 'Preço',
    imgUrl: 'URL da imagem',
    actions: 'Ações',
    lookupOrder: 'Buscar pedido',
    orderId: 'ID do pedido',
    confirmDelete: 'Excluir este item?',
  },
  common: {
    loading: 'Carregando…',
    error: 'Algo deu errado.',
    save: 'Salvar',
    language: 'Idioma',
    previous: 'Anterior',
    next: 'Próxima',
  },
}
