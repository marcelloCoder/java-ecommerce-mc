import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../features/auth/AuthContext'
import { useI18n } from '../i18n/I18nProvider'
import { getApiErrorMessage } from '../lib/api'

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const { t } = useI18n()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    try {
      await login(values.email, values.password)
      navigate(from)
    } catch (error) {
      setError('root', {
        message: getApiErrorMessage(error, t.common.error),
      })
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">
        {t.auth.loginTitle}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <label className="block text-sm">
          {t.auth.email}
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-xs text-red-700">{errors.email.message}</span>
          )}
        </label>
        <label className="block text-sm">
          {t.auth.password}
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            {...register('password')}
          />
        </label>
        {errors.root && (
          <p className="text-sm text-red-700">{errors.root.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[var(--accent)] py-2.5 text-white"
        >
          {t.auth.submitLogin}
        </button>
      </form>
      <p className="mt-4 text-sm">
        <Link to="/forgot-password" className="text-[var(--accent)]">
          {t.auth.forgot}
        </Link>
      </p>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">
        {t.auth.noAccount}{' '}
        <Link to="/register" className="text-[var(--accent)]">
          {t.nav.register}
        </Link>
      </p>
    </main>
  )
}
