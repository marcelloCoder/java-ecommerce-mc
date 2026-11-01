export type RoleDTO = {
  id: number
  authority: string
}

export type CategoryDTO = {
  id: number
  name: string
}

export type ProductDTO = {
  id: number
  name: string
  description: string
  price: number
  imgUrl: string
  categories: CategoryDTO[]
}

export type Page<T> = {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  number: number
  first: boolean
  last: boolean
  empty: boolean
}

export type UserDTO = {
  id: number
  name: string
  email: string
  phone: string | null
  birthDate: string | null
  roles: RoleDTO[]
}

export type UserInsertDTO = {
  name: string
  email: string
  phone?: string
  birthDate?: string
  password: string
}

export type ClientDTO = {
  id: number
  name: string
}

export type PaymentDTO = {
  id: number | null
  moment: string | null
}

export type OrderItemDTO = {
  productId: number
  name: string
  price: number
  quantity: number
  imgUrl: string
  subTotal?: number
}

export type OrderDTO = {
  id: number
  moment: string
  status: 'WAITING_PAYMENT' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED'
  client: ClientDTO
  payment: PaymentDTO | null
  items: OrderItemDTO[]
  total?: number
}

export type TokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
}
