import { useAuth } from '../features/auth/AuthContext'
import { useI18n } from '../i18n/I18nProvider'

export function AccountPage() {
  const { t } = useI18n()
  const { user } = useAuth()

  if (!user) return null

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">
        {t.account.title}
      </h1>
      <dl className="mt-8 space-y-4 rounded-2xl border border-stone-200 bg-[var(--bg-elevated)] p-6 text-sm">
        <div>
          <dt className="text-[var(--ink-muted)]">{t.auth.name}</dt>
          <dd className="text-lg font-medium">{user.name}</dd>
        </div>
        <div>
          <dt className="text-[var(--ink-muted)]">{t.auth.email}</dt>
          <dd>{user.email}</dd>
        </div>
        {user.phone && (
          <div>
            <dt className="text-[var(--ink-muted)]">{t.auth.phone}</dt>
            <dd>{user.phone}</dd>
          </div>
        )}
        <div>
          <dt className="text-[var(--ink-muted)]">{t.account.roles}</dt>
          <dd>{user.roles.map((r) => r.authority).join(', ')}</dd>
        </div>
      </dl>
    </main>
  )
}
