import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider'

export function AdminOrdersPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [orderId, setOrderId] = useState('')

  return (
    <div className="max-w-md space-y-4 rounded-2xl border border-stone-200 bg-[var(--bg-elevated)] p-6">
      <h2 className="font-semibold">{t.admin.lookupOrder}</h2>
      <label className="block text-sm">
        {t.admin.orderId}
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
        />
      </label>
      <button
        type="button"
        className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white"
        onClick={() => {
          const id = Number(orderId)
          if (Number.isFinite(id) && id > 0) navigate(`/orders/${id}`)
        }}
      >
        {t.admin.lookupOrder}
      </button>
    </div>
  )
}
