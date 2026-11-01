import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import { useCart } from '../features/cart/CartContext'
import { createOrder } from '../features/orders/ordersApi'
import { useI18n } from '../i18n/I18nProvider'
import { getApiErrorMessage } from '../lib/api'
import { formatMoney } from '../lib/format'

export function CheckoutPage() {
  const { t, locale } = useI18n()
  const { token } = useAuth()
  const { items, subtotal, clear } = useCart()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          name: i.name,
          price: i.price,
          imgUrl: i.imgUrl,
        })),
      ),
    onSuccess: (order) => {
      clear()
      navigate(`/orders/${order.id}`)
    },
  })

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p>{t.cart.empty}</p>
        <Link to="/products" className="mt-4 inline-block text-[var(--accent)]">
          {t.cart.continue}
        </Link>
      </main>
    )
  }

  if (!token) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">
          {t.checkout.title}
        </h1>
        <p className="mt-4">{t.checkout.needLogin}</p>
        <Link
          to="/login"
          state={{ from: '/checkout' }}
          className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-white"
        >
          {t.nav.login}
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-2 sm:px-6">
      <section>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {t.checkout.title}
        </h1>
        <h2 className="mt-8 mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
          {t.checkout.summary}
        </h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-4 text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatMoney(item.price * item.quantity, locale)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg font-semibold">
          {t.cart.subtotal}: {formatMoney(subtotal, locale)}
        </p>
      </section>
      <section className="rounded-2xl border border-stone-200 bg-[var(--bg-elevated)] p-6">
        <button
          type="button"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate()}
          className="w-full rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {mutation.isPending ? t.checkout.placing : t.checkout.confirm}
        </button>
        {mutation.isError && (
          <p className="mt-4 text-sm text-red-700">
            {getApiErrorMessage(mutation.error, t.common.error)}
          </p>
        )}
      </section>
    </main>
  )
}
