import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider'
import { formatMoney } from '../../lib/format'
import { pinAspect, resolveProductImage } from '../../lib/pinAssets'
import type { ProductDTO } from '../../types/api'
import { useCart } from '../../features/cart/CartContext'

type Props = {
  product: ProductDTO
}

export function PinCard({ product }: Props) {
  const { t, locale } = useI18n()
  const { addItem } = useCart()
  const src = resolveProductImage(product)

  return (
    <article className="group relative mb-[var(--gutter)] break-inside-avoid">
      <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-[var(--radius-pin)] bg-stone-200">
        <img
          src={src}
          alt={product.name}
          className="w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          style={{ aspectRatio: pinAspect(product.id) }}
          loading="lazy"
        />
      </Link>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-end p-3 opacity-0 transition group-hover:opacity-100">
        <button
          type="button"
          className="pointer-events-auto rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white shadow"
          onClick={() => addItem(product)}
        >
          {t.product.addToCart}
        </button>
      </div>
      <div className="mt-2 px-1">
        <Link
          to={`/products/${product.id}`}
          className="block text-sm font-medium text-[var(--ink)] hover:underline"
        >
          {product.name}
        </Link>
        <p className="text-sm text-[var(--ink-muted)]">
          {formatMoney(product.price, locale)}
        </p>
      </div>
    </article>
  )
}
