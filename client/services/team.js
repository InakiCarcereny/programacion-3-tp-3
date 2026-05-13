import { URL_PREFIX } from '../lib/url-prefix.js'

export async function getTeam() {
  try {
    const response = await fetch(`${URL_PREFIX}/equipo`)

    if (!response.ok) {
      throw new Error(`Error fetching team: ${response.statusText}`)
    }

    const team = await response.json()

    return team
  } catch (error) {
    console.error('Error fetching team:', error)
    throw error
  }
}
