import { api } from '../../lib/api'
import type { TokenResponse, UserDTO, UserInsertDTO } from '../../types/api'

export async function loginRequest(
  username: string,
  password: string,
): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>('/auth/login', {
    email: username,
    password,
  })
  return data
}

export async function refreshRequest(
  refreshToken: string,
): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>('/auth/refresh', {
    refresh_token: refreshToken,
  })
  return data
}

export async function registerRequest(payload: UserInsertDTO): Promise<UserDTO> {
  const { data } = await api.post<UserDTO>('/users', payload)
  return data
}

export async function getMe(): Promise<UserDTO> {
  const { data } = await api.get<UserDTO>('/users/me')
  return data
}

export async function requestRecoverToken(email: string): Promise<void> {
  await api.post('/auth/recovertoken', { email })
}

export async function saveNewPassword(
  token: string,
  password: string,
): Promise<void> {
  await api.put('/auth/new-password', { token, password })
}
