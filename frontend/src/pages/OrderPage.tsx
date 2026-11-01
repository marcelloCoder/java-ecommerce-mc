import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchOrder, orderTotal } from '../features/orders/ordersApi'
import { useI18n } from '../i18n/I18nProvider'
import { formatDate, formatMoney } from '../lib/format'
import { resolveProductImage } from '../lib/pinAssets'
import type { OrderDTO } from '../types/api'

function statusLabel(status: OrderDTO['status'], t: ReturnType<typeof useI18n>['t']) {
  switch (status) {
    case 'WAITING_PAYMENT':
      return t.order.waiting
    case 'PAID':
      return t.order.paid
    case 'SHIPPED':
      return t.order.shipped
    case 'DELIVERED':
      return t.order.delivered
    case 'CANCELED':
      return t.order.canceled
    default:
      return status
  }
}

export function OrderPage() {
  const { id } = useParams()
  const orderId = Number(id)
  const { t, locale } = useI18n()

  const query = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId),
    enabled: Number.isFinite(orderId),
  })

  if (query.isLoading) {
    return <p className="p-10 text-center">{t.common.loading}</p>
  }
  if (query.isError || !query.data) {
    return <p className="p-10 text-center text-red-700">{t.common.error}</p>
  }

  const order = query.data

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">
        {t.order.title} #{order.id}
      </h1>
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--ink-muted)]">{t.order.status}</dt>
          <dd className="font-medium">{statusLabel(order.status, t)}</dd>
        </div>
        <div>
          <dt className="text-[var(--ink-muted)]">{t.order.moment}</dt>
          <dd>{formatDate(order.moment, locale)}</dd>
        </div>
        <div>
          <dt className="text-[var(--ink-muted)]">{t.order.total}</dt>
          <dd className="text-lg font-semibold">
            {formatMoney(orderTotal(order), locale)}
          </dd>
        </div>
      </dl>
      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
        {t.order.items}
      </h2>
      <ul className="space-y-3">
        {order.items.map((item) => (
          <li
            key={`${item.productId}-${item.name}`}
            className="flex items-center gap-4 rounded-xl border border-stone-200 p-3"
          >
            <img
              src={
                item.imgUrl?.startsWith('http')
                  ? resolveProductImage({
                      id: item.productId,
                      name: item.name,
                      imgUrl: item.imgUrl,
                    })
                  : resolveProductImage({
                      id: item.productId,
                      name: item.name,
                    })
              }
              alt={item.name}
              className="h-16 w-14 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-[var(--ink-muted)]">
                {item.quantity} × {formatMoney(item.price, locale)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
