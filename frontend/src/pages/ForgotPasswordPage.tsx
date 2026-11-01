import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { requestRecoverToken } from '../features/auth/authApi'
import { useI18n } from '../i18n/I18nProvider'
import { getApiErrorMessage } from '../lib/api'

const schema = z.object({ email: z.email() })
type FormValues = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    try {
      await requestRecoverToken(values.email)
      setSent(true)
    } catch (error) {
      setError('root', {
        message: getApiErrorMessage(error, t.common.error),
      })
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">
        {t.auth.forgotTitle}
      </h1>
      {sent ? (
        <p className="mt-6 text-[var(--ink-muted)]">{t.auth.forgotSent}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <label className="block text-sm">
            {t.auth.email}
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
              {...register('email')}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[var(--accent)] py-2.5 text-white"
          >
            {t.auth.forgotSubmit}
          </button>
        </form>
      )}
    </main>
  )
}
