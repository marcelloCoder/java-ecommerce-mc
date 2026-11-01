import { api } from '../../lib/api'
import type { Page, ProductDTO } from '../../types/api'

export type ProductQuery = {
  name?: string
  categoryId?: string
  page?: number
  size?: number
  sort?: string
}

export async function fetchProducts(
  query: ProductQuery = {},
): Promise<Page<ProductDTO>> {
  const { data } = await api.get<Page<ProductDTO>>('/products', {
    params: {
      name: query.name ?? '',
      categoryId: query.categoryId ?? '0',
      page: query.page ?? 0,
      size: query.size ?? 12,
      sort: query.sort,
    },
  })
  return data
}

export async function fetchProduct(id: number): Promise<ProductDTO> {
  const { data } = await api.get<ProductDTO>(`/products/${id}`)
  return data
}

export async function createProduct(
  payload: Omit<ProductDTO, 'id'> & { id?: number },
): Promise<ProductDTO> {
  const { data } = await api.post<ProductDTO>('/products', payload)
  return data
}

export async function updateProduct(
  id: number,
  payload: ProductDTO,
): Promise<ProductDTO> {
  const { data } = await api.put<ProductDTO>(`/products/${id}`, payload)
  return data
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`)
}
