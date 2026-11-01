import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { MasonryGrid } from '../components/catalog/MasonryGrid'
import { fetchCategories } from '../features/categories/categoriesApi'
import { fetchProducts } from '../features/products/productsApi'
import { useI18n } from '../i18n/I18nProvider'
import { pinUrl } from '../lib/pinAssets'

export function HomePage() {
  const { t } = useI18n()
  const productsQuery = useQuery({
    queryKey: ['products', 'home'],
    queryFn: () => fetchProducts({ page: 0, size: 8, sort: 'name,asc' }),
  })
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  return (
    <main>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pinUrl('pin-arched-living')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-900/45 to-transparent" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-4 py-16 sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-stone-200">
            {t.home.eyebrow}
          </p>
          <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-tight text-white sm:text-6xl">
            {t.home.title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-stone-200 sm:text-lg">
            {t.home.subtitle}
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
            >
              {t.home.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {[t.home.trust1, t.home.trust2, t.home.trust3, t.home.trust4].map(
          (label) => (
            <p
              key={label}
              className="rounded-2xl border border-stone-200 bg-[var(--bg-elevated)] px-4 py-3 text-center text-sm text-[var(--ink-muted)]"
            >
              {label}
            </p>
          ),
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-6 font-[family-name:var(--font-display)] text-3xl">
          {t.home.categories}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(categoriesQuery.data ?? []).map((category, index) => {
            const covers = [
              'pin-desk-device',
              'pin-book-stack',
              'pin-patio-dining',
              'pin-hardware-workshop',
            ] as const
            const cover = covers[index % covers.length]!
            return (
              <Link
                key={category.id}
                to={`/products?categoryId=${category.id}`}
                className="group overflow-hidden rounded-[var(--radius-pin)]"
              >
                <div className="relative aspect-[4/5]">
                  <img
                    src={pinUrl(cover)}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                    {category.name}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            {t.home.featured}
          </h2>
          <Link to="/products" className="text-sm text-[var(--accent)]">
            {t.home.cta}
          </Link>
        </div>
        {productsQuery.isLoading && (
          <p className="text-[var(--ink-muted)]">{t.common.loading}</p>
        )}
        {productsQuery.isError && (
          <p className="text-red-700">{t.common.error}</p>
        )}
        {productsQuery.data && (
          <MasonryGrid products={productsQuery.data.content} />
        )}
      </section>
    </main>
  )
}
