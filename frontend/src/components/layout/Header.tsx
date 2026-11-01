import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'
import { useCart } from '../../features/cart/CartContext'
import { useI18n, type Locale } from '../../i18n/I18nProvider'

export function Header() {
  const { t, locale, setLocale } = useI18n()
  const { user, logout, isAdmin } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  function onSearch(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('name', q.trim())
    navigate(`/products?${params.toString()}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--ink)]"
        >
          {t.brand}
        </Link>

        <nav className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
          <NavLink to="/products" className="hover:text-[var(--ink)]">
            {t.nav.products}
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className="hover:text-[var(--ink)]">
              {t.nav.admin}
            </NavLink>
          )}
        </nav>

        <form onSubmit={onSearch} className="order-3 w-full flex-1 sm:order-none sm:max-w-md">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.nav.search}
            className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
          />
        </form>

        <div className="ml-auto flex items-center gap-3 text-sm">
          <label className="sr-only" htmlFor="locale">
            {t.common.language}
          </label>
          <select
            id="locale"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="rounded-full border border-stone-300 bg-white px-2 py-1"
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
          </select>

          <Link to="/cart" className="relative hover:text-[var(--accent)]">
            {t.nav.cart}
            {count > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full bg-[var(--accent)] px-1.5 text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/account" className="hover:text-[var(--ink)]">
                {t.nav.account}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                {t.nav.logout}
              </button>
            </>
          ) : (
            <>
              <Link to="/login">{t.nav.login}</Link>
              <Link
                to="/register"
                className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-white"
              >
                {t.nav.register}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
