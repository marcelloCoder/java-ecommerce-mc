import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MasonryGrid } from '../components/catalog/MasonryGrid'
import { Pagination } from '../components/ui/Pagination'
import { fetchCategories } from '../features/categories/categoriesApi'
import { fetchProducts } from '../features/products/productsApi'
import { useI18n } from '../i18n/I18nProvider'

export function ProductsPage() {
  const { t } = useI18n()
  const [params, setParams] = useSearchParams()

  const name = params.get('name') ?? ''
  const categoryId = params.get('categoryId') ?? '0'
  const page = Number(params.get('page') ?? '0')
  const sort = params.get('sort') ?? 'name,asc'

  const query = useQuery({
    queryKey: ['products', name, categoryId, page, sort],
    queryFn: () =>
      fetchProducts({ name, categoryId, page, size: 12, sort }),
  })

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const meta = useMemo(() => query.data, [query.data])

  function patch(next: Record<string, string>) {
    const sp = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => {
      if (!v || v === '0' || (k === 'page' && v === '0')) sp.delete(k)
      else sp.set(k, v)
    })
    if ('name' in next || 'categoryId' in next || 'sort' in next) {
      sp.delete('page')
    }
    setParams(sp)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl">
        {t.products.title}
      </h1>

      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-[var(--bg-elevated)] p-4 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="flex flex-1 flex-col gap-1 text-sm">
          <span className="text-[var(--ink-muted)]">{t.nav.search}</span>
          <input
            value={name}
            onChange={(e) => patch({ name: e.target.value })}
            className="rounded-xl border border-stone-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-[var(--ink-muted)]">{t.products.filters}</span>
          <select
            value={categoryId}
            onChange={(e) => patch({ categoryId: e.target.value })}
            className="rounded-xl border border-stone-300 px-3 py-2"
          >
            <option value="0">{t.products.allCategories}</option>
            {(categoriesQuery.data ?? []).map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-[var(--ink-muted)]">{t.products.sort}</span>
          <select
            value={sort}
            onChange={(e) => patch({ sort: e.target.value })}
            className="rounded-xl border border-stone-300 px-3 py-2"
          >
            <option value="name,asc">{t.products.sortName}</option>
            <option value="price,asc">{t.products.sortPrice}</option>
          </select>
        </label>
        <button
          type="button"
          className="rounded-full border border-stone-300 px-4 py-2 text-sm"
          onClick={() => setParams({})}
        >
          {t.products.clearFilters}
        </button>
      </div>

      {query.isLoading && <p>{t.common.loading}</p>}
      {query.isError && <p className="text-red-700">{t.common.error}</p>}

      {meta && meta.content.length === 0 && (
        <p className="text-[var(--ink-muted)]">{t.products.empty}</p>
      )}

      {meta && meta.content.length > 0 && (
        <>
          <p className="mb-4 text-sm text-[var(--ink-muted)]">
            {meta.totalElements} {t.products.results} · {t.products.page}{' '}
            {meta.number + 1} {t.products.of} {meta.totalPages}
          </p>
          <MasonryGrid products={meta.content} />
          <Pagination
            page={meta.number}
            totalPages={meta.totalPages}
            onChange={(p) => patch({ page: String(p) })}
          />
        </>
      )}
    </main>
  )
}
