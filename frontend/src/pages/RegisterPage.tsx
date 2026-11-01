import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { registerRequest } from '../features/auth/authApi'
import { useAuth } from '../features/auth/AuthContext'
import { useI18n } from '../i18n/I18nProvider'
import { getApiErrorMessage } from '../lib/api'

const schema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  password: z.string().min(8),
})

type FormValues = z.infer<typeof schema>

export function RegisterPage() {
  const { t } = useI18n()
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    try {
      await registerRequest({
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate || undefined,
        password: values.password,
      })
      await login(values.email, values.password)
      navigate('/')
    } catch (error) {
      setError('root', {
        message: getApiErrorMessage(error, t.common.error),
      })
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">
        {t.auth.registerTitle}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <label className="block text-sm">
          {t.auth.name}
          <input
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            {...register('name')}
          />
        </label>
        <label className="block text-sm">
          {t.auth.email}
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            {...register('email')}
          />
        </label>
        <label className="block text-sm">
          {t.auth.phone}
          <input
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            {...register('phone')}
          />
        </label>
        <label className="block text-sm">
          {t.auth.birthDate}
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            {...register('birthDate')}
          />
        </label>
        <label className="block text-sm">
          {t.auth.password}
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-xs text-red-700">
              {errors.password.message}
            </span>
          )}
        </label>
        {errors.root && (
          <p className="text-sm text-red-700">{errors.root.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[var(--accent)] py-2.5 text-white"
        >
          {t.auth.submitRegister}
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--ink-muted)]">
        {t.auth.hasAccount}{' '}
        <Link to="/login" className="text-[var(--accent)]">
          {t.nav.login}
        </Link>
      </p>
    </main>
  )
}
