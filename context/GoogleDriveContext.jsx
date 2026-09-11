import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { googleDriveApi } from '../services/googleDriveApi.js'

const GoogleDriveContext = createContext()

export function GoogleDriveProvider({ children }) {
  const { token } = useAuth()
  const [status, setStatus] = useState('checking')
  const [connection, setConnection] = useState({})
  const [message, setMessage] = useState('')

  const refreshStatus = useCallback(async () => {
    if (!token) return
    setStatus('checking')
    setMessage('')
    try {
      const response = await googleDriveApi.getStatus(token)
      const data = response.data || response
      setConnection(data)
      setStatus(data.connected ? 'connected' : 'disconnected')
    } catch {
      setConnection({})
      setStatus('error')
      setMessage('Unable to connect Google Drive. Please try again.')
    }
  }, [token])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const completedOAuth = params.get('googleDrive') === 'connected'

    refreshStatus().finally(() => {
      if (!completedOAuth) return
      params.delete('googleDrive')
      const query = params.toString()
      window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
    })
  }, [refreshStatus])

  // Covers an OAuth flow that returns to an already-open admin tab.
  useEffect(() => {
    const handleFocus = () => refreshStatus()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refreshStatus])

  const connect = async () => {
    setStatus('connecting')
    setMessage('')

    try {
      const response = await googleDriveApi.connect(token)
      window.location.assign(response.url)
    } catch {
      setStatus('error')
      setMessage('Unable to connect Google Drive. Please try again.')
    }
  }

  const disconnect = async () => {
    setMessage('')
    setStatus('disconnecting')
    try {
      await googleDriveApi.disconnect(token)
      setConnection({})
      setStatus('disconnected')
    } catch {
      setMessage('Unable to disconnect Google Drive. Please try again.')
      setStatus('error')
    }
  }

  return (
    <GoogleDriveContext.Provider value={{ status, connection, message, refreshStatus, connect, disconnect }}>
      {children}
    </GoogleDriveContext.Provider>
  )
}

export function useGoogleDrive() {
  const context = useContext(GoogleDriveContext)
  if (!context) throw new Error('useGoogleDrive must be used within GoogleDriveProvider')
  return context
}
