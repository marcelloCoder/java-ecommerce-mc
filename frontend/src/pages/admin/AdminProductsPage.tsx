import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchCategories } from '../../features/categories/categoriesApi'
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../../features/products/productsApi'
import { useI18n } from '../../i18n/I18nProvider'
import { formatMoney } from '../../lib/format'
import { getApiErrorMessage } from '../../lib/api'
import type { CategoryDTO, ProductDTO } from '../../types/api'
import { Pagination } from '../../components/ui/Pagination'

const emptyForm = {
  name: '',
  description: '',
  price: 0,
  imgUrl: '',
  categoryIds: [] as number[],
}

export function AdminProductsPage() {
  const { t, locale } = useI18n()
  const qc = useQueryClient()
  const [page, setPage] = useState(0)
  const [editing, setEditing] = useState<ProductDTO | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const productsQuery = useQuery({
    queryKey: ['admin-products', page],
    queryFn: () => fetchProducts({ page, size: 10, sort: 'name,asc' }),
  })
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const saveMutation = useMutation({
    mutationFn: async () => {
      const categories = (categoriesQuery.data ?? []).filter((c) =>
        form.categoryIds.includes(c.id),
      )
      const payload = {
        id: editing?.id ?? 0,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        imgUrl: form.imgUrl,
        categories,
      }
      if (editing) return updateProduct(editing.id, payload)
      return createProduct(payload)
    },
    onSuccess: async () => {
      setEditing(null)
      setForm(emptyForm)
      setError('')
      await qc.invalidateQueries({ queryKey: ['admin-products'] })
      await qc.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (err) => setError(getApiErrorMessage(err, t.common.error)),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-products'] })
      await qc.invalidateQueries({ queryKey: ['products'] })
    },
  })

  function startEdit(product: ProductDTO) {
    setEditing(product)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
      categoryIds: product.categories.map((c) => c.id),
    })
  }

  function toggleCategory(category: CategoryDTO) {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(category.id)
        ? prev.categoryIds.filter((id) => id !== category.id)
        : [...prev.categoryIds, category.id],
    }))
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-stone-200 bg-[var(--bg-elevated)] p-4">
        <h2 className="mb-4 font-semibold">
          {editing ? t.admin.edit : t.admin.create}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder={t.admin.name}
            className="rounded-xl border border-stone-300 px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            placeholder={t.admin.price}
            className="rounded-xl border border-stone-300 px-3 py-2"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
          <input
            placeholder={t.admin.imgUrl}
            className="rounded-xl border border-stone-300 px-3 py-2 sm:col-span-2"
            value={form.imgUrl}
            onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
          />
          <textarea
            placeholder={t.admin.description}
            className="min-h-24 rounded-xl border border-stone-300 px-3 py-2 sm:col-span-2"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {(categoriesQuery.data ?? []).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleCategory(c)}
                className={`rounded-full px-3 py-1 text-xs ${
                  form.categoryIds.includes(c.id)
                    ? 'bg-[var(--nature)] text-white'
                    : 'border border-stone-300'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white"
            onClick={() => saveMutation.mutate()}
          >
            {t.admin.save}
          </button>
          {editing && (
            <button
              type="button"
              className="rounded-full border border-stone-300 px-4 py-2 text-sm"
              onClick={() => {
                setEditing(null)
                setForm(emptyForm)
              }}
            >
              {t.admin.cancel}
            </button>
          )}
        </div>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">{t.admin.name}</th>
              <th className="px-3 py-2">{t.admin.price}</th>
              <th className="px-3 py-2">{t.admin.actions}</th>
            </tr>
          </thead>
          <tbody>
            {(productsQuery.data?.content ?? []).map((product) => (
              <tr key={product.id} className="border-t border-stone-200">
                <td className="px-3 py-2">{product.id}</td>
                <td className="px-3 py-2">{product.name}</td>
                <td className="px-3 py-2">
                  {formatMoney(product.price, locale)}
                </td>
                <td className="px-3 py-2 space-x-2">
                  <button
                    type="button"
                    className="text-[var(--accent)]"
                    onClick={() => startEdit(product)}
                  >
                    {t.admin.edit}
                  </button>
                  <button
                    type="button"
                    className="text-red-700"
                    onClick={() => {
                      if (confirm(t.admin.confirmDelete)) {
                        deleteMutation.mutate(product.id)
                      }
                    }}
                  >
                    {t.admin.delete}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {productsQuery.data && (
        <Pagination
          page={productsQuery.data.number}
          totalPages={productsQuery.data.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  )
}
