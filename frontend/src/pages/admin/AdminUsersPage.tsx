import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteUser, fetchUsers } from '../../features/users/usersApi'
import { useI18n } from '../../i18n/I18nProvider'
import { Pagination } from '../../components/ui/Pagination'

export function AdminUsersPage() {
  const { t } = useI18n()
  const qc = useQueryClient()
  const [page, setPage] = useState(0)

  const query = useQuery({
    queryKey: ['admin-users', page],
    queryFn: () => fetchUsers(page, 10),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">{t.auth.name}</th>
              <th className="px-3 py-2">{t.auth.email}</th>
              <th className="px-3 py-2">{t.account.roles}</th>
              <th className="px-3 py-2">{t.admin.actions}</th>
            </tr>
          </thead>
          <tbody>
            {(query.data?.content ?? []).map((user) => (
              <tr key={user.id} className="border-t border-stone-200">
                <td className="px-3 py-2">{user.id}</td>
                <td className="px-3 py-2">{user.name}</td>
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">
                  {user.roles.map((r) => r.authority).join(', ')}
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="text-red-700"
                    onClick={() => {
                      if (confirm(t.admin.confirmDelete)) {
                        deleteMutation.mutate(user.id)
                      }
                    }}
                  >
                    {t.admin.delete}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {query.data && (
        <Pagination
          page={query.data.number}
          totalPages={query.data.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  )
}
