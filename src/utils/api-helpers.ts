import { NEXT_PUBLIC_STRAPI_API_URL } from '@/utils/config'
export function getStrapiURL(path = '') {
  return `${NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null
  }

  if (url.startsWith('http') || url.startsWith('//')) {
    return url
  }

  return `${getStrapiURL()}${url}`
}
