import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'
import { saveNewPassword } from '../features/auth/authApi'
import { useI18n } from '../i18n/I18nProvider'
import { getApiErrorMessage } from '../lib/api'

const schema = z.object({ password: z.string().min(8) })
type FormValues = z.infer<typeof schema>

export function RecoverPasswordPage() {
  const { token = '' } = useParams()
  const { t } = useI18n()
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    try {
      await saveNewPassword(token, values.password)
      setDone(true)
    } catch (error) {
      setError('root', {
        message: getApiErrorMessage(error, t.common.error),
      })
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">
        {t.auth.recoverTitle}
      </h1>
      {done ? (
        <p className="mt-6">
          {t.auth.recoverDone}{' '}
          <Link to="/login" className="text-[var(--accent)]">
            {t.nav.login}
          </Link>
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
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
            {t.auth.recoverSubmit}
          </button>
        </form>
      )}
    </main>
  )
}
