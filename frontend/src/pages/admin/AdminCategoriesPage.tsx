import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
  createCategory,
  fetchCategories,
} from '../../features/categories/categoriesApi'
import { useI18n } from '../../i18n/I18nProvider'
import { getApiErrorMessage } from '../../lib/api'

export function AdminCategoriesPage() {
  const { t } = useI18n()
  const qc = useQueryClient()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const mutation = useMutation({
    mutationFn: () => createCategory(name),
    onSuccess: async () => {
      setName('')
      setError('')
      await qc.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (err) => setError(getApiErrorMessage(err, t.common.error)),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.admin.name}
          className="flex-1 rounded-xl border border-stone-300 px-3 py-2"
        />
        <button
          type="button"
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white"
          onClick={() => mutation.mutate()}
        >
          {t.admin.create}
        </button>
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <ul className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-[var(--bg-elevated)]">
        {(query.data ?? []).map((category) => (
          <li key={category.id} className="flex justify-between px-4 py-3 text-sm">
            <span>{category.name}</span>
            <span className="text-[var(--ink-muted)]">#{category.id}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
