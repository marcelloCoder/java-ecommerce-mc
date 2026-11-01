import { api } from '../../lib/api'
import type { OrderDTO, OrderItemDTO } from '../../types/api'

export async function createOrder(
  items: Pick<OrderItemDTO, 'productId' | 'quantity' | 'name' | 'price' | 'imgUrl'>[],
): Promise<OrderDTO> {
  const { data } = await api.post<OrderDTO>('/orders', {
    id: null,
    moment: null,
    status: null,
    client: null,
    payment: null,
    items: items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      name: item.name ?? '',
      price: item.price ?? 0,
      imgUrl: item.imgUrl ?? '',
    })),
  })
  return data
}

export async function fetchOrder(id: number): Promise<OrderDTO> {
  const { data } = await api.get<OrderDTO>(`/orders/${id}`)
  return data
}

export function orderTotal(order: OrderDTO): number {
  if (typeof order.total === 'number') return order.total
  return order.items.reduce((sum, item) => {
    const sub =
      typeof item.subTotal === 'number'
        ? item.subTotal
        : item.price * item.quantity
    return sum + sub
  }, 0)
}
