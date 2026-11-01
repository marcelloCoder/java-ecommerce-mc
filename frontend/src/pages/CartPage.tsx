import { Link } from 'react-router-dom'
import { useCart } from '../features/cart/CartContext'
import { useI18n } from '../i18n/I18nProvider'
import { formatMoney } from '../lib/format'

export function CartPage() {
  const { t, locale } = useI18n()
  const { items, subtotal, setQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {t.cart.title}
        </h1>
        <p className="mt-4 text-[var(--ink-muted)]">{t.cart.empty}</p>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-white"
        >
          {t.cart.continue}
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-4xl">
        {t.cart.title}
      </h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-[var(--bg-elevated)] p-4 sm:flex-row sm:items-center"
          >
            <Link to={`/products/${item.productId}`} className="shrink-0">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="h-28 w-24 rounded-xl object-cover"
              />
            </Link>
            <div className="flex-1">
              <Link
                to={`/products/${item.productId}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-sm text-[var(--ink-muted)]">
                {formatMoney(item.price, locale)}
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              {t.cart.quantity}
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  setQuantity(item.productId, Number(e.target.value))
                }
                className="w-16 rounded-lg border border-stone-300 px-2 py-1"
              />
            </label>
            <p className="min-w-24 text-right font-medium">
              {formatMoney(item.price * item.quantity, locale)}
            </p>
            <button
              type="button"
              className="text-sm text-red-700"
              onClick={() => removeItem(item.productId)}
            >
              {t.cart.remove}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-end gap-3">
        <p className="text-lg font-semibold">
          {t.cart.subtotal}: {formatMoney(subtotal, locale)}
        </p>
        <p className="text-sm text-[var(--ink-muted)]">{t.cart.shippingNote}</p>
        <Link
          to="/checkout"
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
        >
          {t.cart.checkout}
        </Link>
      </div>
    </main>
  )
}
