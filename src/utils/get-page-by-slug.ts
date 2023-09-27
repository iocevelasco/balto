import { fetchAPI } from './fetch-api'
import { NEXT_PUBLIC_STRAPI_API_TOKEN } from './config'
export async function getPageBySlug(slug: string, lang: string) {
  try {
    const token = NEXT_PUBLIC_STRAPI_API_TOKEN
    const path = `/pages`
    const urlParamsObject = {
      filters: { slug },
      locale: lang,
      populate: 'deep',
    }
    const options = { headers: { Authorization: `Bearer ${token}` } }
    return await fetchAPI(path, urlParamsObject, options)
  } catch (error) {
    console.error({ error })
  }
}
