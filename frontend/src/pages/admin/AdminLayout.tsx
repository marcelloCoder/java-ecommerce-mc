import { NavLink, Outlet } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider'

export function AdminLayout() {
  const { t } = useI18n()
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-1.5 text-sm ${
      isActive
        ? 'bg-[var(--accent)] text-white'
        : 'border border-stone-300 text-[var(--ink-muted)]'
    }`

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl">
        {t.admin.title}
      </h1>
      <nav className="mb-8 flex flex-wrap gap-2">
        <NavLink to="/admin" end className={linkClass}>
          {t.admin.products}
        </NavLink>
        <NavLink to="/admin/categories" className={linkClass}>
          {t.admin.categories}
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          {t.admin.users}
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          {t.admin.orders}
        </NavLink>
      </nav>
      <Outlet />
    </main>
  )
}
