import { api } from '../../lib/api'
import type { CategoryDTO } from '../../types/api'

export async function fetchCategories(): Promise<CategoryDTO[]> {
  const { data } = await api.get<CategoryDTO[]>('/categories')
  return data
}

export async function createCategory(name: string): Promise<CategoryDTO> {
  const { data } = await api.post<CategoryDTO>('/categories', { name })
  return data
}
