import { api } from '../../lib/api'
import type { Page, UserDTO } from '../../types/api'

export async function fetchUsers(page = 0, size = 10): Promise<Page<UserDTO>> {
  const { data } = await api.get<Page<UserDTO>>('/users', {
    params: { page, size },
  })
  return data
}

export async function updateUser(
  id: number,
  payload: Partial<UserDTO>,
): Promise<UserDTO> {
  const { data } = await api.put<UserDTO>(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`)
}
