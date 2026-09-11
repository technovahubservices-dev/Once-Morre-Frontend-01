import { API_BASE } from './apiConfig.js'

const request = async (path, token, options = {}) => {
  const res = await fetch(`${API_BASE}/google-drive${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    credentials: 'include',
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Unable to update Google Drive')
  return data
}

export const googleDriveApi = {
  getStatus: (token) => request('/status', token),
  disconnect: (token) => request('/disconnect', token, { method: 'POST' }),
  // OAuth must be a browser navigation so Google can return to the admin portal.
  connect: async (token) => {
    return request('/connect', token)
  },
}
