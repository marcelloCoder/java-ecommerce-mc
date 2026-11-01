import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../features/cart/CartContext'
import { fetchProduct } from '../features/products/productsApi'
import { useI18n } from '../i18n/I18nProvider'
import { formatMoney } from '../lib/format'
import { resolveProductImage } from '../lib/pinAssets'

export function ProductDetailPage() {
  const { id } = useParams()
  const productId = Number(id)
  const { t, locale } = useI18n()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const query = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    enabled: Number.isFinite(productId),
  })

  const mutation = useMutation({
    mutationFn: async () => {
      if (!query.data) return
      addItem(query.data)
    },
    onSuccess: () => {
      setAdded(true)
      window.setTimeout(() => setAdded(false), 2000)
    },
  })

  if (query.isLoading) {
    return <p className="p-10 text-center">{t.common.loading}</p>
  }
  if (query.isError || !query.data) {
    return <p className="p-10 text-center text-red-700">{t.common.error}</p>
  }

  const product = query.data
  const image = resolveProductImage(product)

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-2 sm:px-6">
      <div className="overflow-hidden rounded-[var(--radius-pin)] bg-stone-200">
        <img
          src={image}
          alt={product.name}
          className="aspect-[4/5] w-full object-cover"
        />
      </div>
      <div>
        <Link to="/products" className="text-sm text-[var(--accent)]">
          {t.product.back}
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl">
          {product.name}
        </h1>
        <p className="mt-3 text-2xl text-[var(--accent-soft)]">
          {formatMoney(product.price, locale)}
        </p>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          {t.product.categories}:{' '}
          {product.categories.map((c) => c.name).join(', ')}
        </p>
        <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
          {t.product.description}
        </h2>
        <p className="mt-2 max-w-prose leading-relaxed text-[var(--ink)]">
          {product.description}
        </p>
        <button
          type="button"
          className="mt-8 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          onClick={() => mutation.mutate()}
        >
          {added ? t.product.added : t.product.addToCart}
        </button>
      </div>
    </main>
  )
}
