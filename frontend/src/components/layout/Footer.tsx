import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-16 border-t border-stone-200 bg-[var(--bg-elevated)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-[family-name:var(--font-display)] text-xl">{t.brand}</p>
        <div className="flex gap-4 text-sm text-[var(--ink-muted)]">
          <Link to="/products">{t.nav.products}</Link>
          <Link to="/cart">{t.nav.cart}</Link>
          <Link to="/account">{t.nav.account}</Link>
        </div>
      </div>
    </footer>
  )
}
