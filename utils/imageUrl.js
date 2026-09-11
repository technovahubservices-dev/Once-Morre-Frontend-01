import { API_BASE } from '../services/apiConfig.js'

export const getImageUrl = (src) => {
  if (!src) return ''

  const url =
    typeof src === 'string'
      ? src
      : src?.url ||
        src?.imageUrl ||
        src?.webContentLink ||
        src?.webViewLink ||
        ''

  if (!url) return ''

  const markdownMatch = url.match(/\]\((https?:\/\/[^)]+)\)/)
  const cleanUrl = markdownMatch ? markdownMatch[1] : url

  const fileId =
    (typeof src === 'object' && src?.fileId) ||
    cleanUrl.match(/drive\.google\.com\/.*?[?&]id=([^&]+)/)?.[1] ||
    cleanUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1]

  if (fileId) {
    return `${API_BASE}/google-drive/image/${fileId}`
  }

  return cleanUrl
}




