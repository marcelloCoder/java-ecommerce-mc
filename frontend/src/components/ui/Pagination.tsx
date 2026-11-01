import { useI18n } from '../../i18n/I18nProvider'

type Props = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: Props) {
  const { t } = useI18n()
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i)

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="rounded-full border border-stone-300 px-3 py-1.5 text-sm disabled:opacity-40"
        disabled={page <= 0}
        onClick={() => onChange(page - 1)}
      >
        {t.common.previous}
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`min-w-9 rounded-full px-3 py-1.5 text-sm ${
            p === page
              ? 'bg-[var(--accent)] text-white'
              : 'border border-stone-300 text-stone-700'
          }`}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p + 1}
        </button>
      ))}
      <button
        type="button"
        className="rounded-full border border-stone-300 px-3 py-1.5 text-sm disabled:opacity-40"
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
      >
        {t.common.next}
      </button>
    </nav>
  )
}
