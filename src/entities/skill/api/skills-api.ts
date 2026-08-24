import type { Skill } from '@/shared/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

const SKILLS_URL = '/db/skills.json'
const RESPONSE_DELAY_MS = 200

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getSkillsApi(): Promise<Skill[]> {
  await delay(RESPONSE_DELAY_MS)

  try {
    const response = await fetch(SKILLS_URL)

    if (!response.ok) {
      throw new Error('Не удалось загрузить навыки')
    }

    const mockSkills: Skill[] = await response.json()

    let registeredSkills: Skill[] = []

    try {
      const rawRegisteredSkills = localStorage.getItem(LOCAL_STORAGE_KEYS.REGISTERED_SKILLS)

      if (rawRegisteredSkills) {
        const parsedRegisteredSkills: unknown = JSON.parse(rawRegisteredSkills)

        if (Array.isArray(parsedRegisteredSkills)) {
          registeredSkills = parsedRegisteredSkills as Skill[]
        }
      }
    } catch {
      registeredSkills = []
    }

    const skillsById = new Map<string, Skill>()

    for (const skill of mockSkills) {
      skillsById.set(skill.id, skill)
    }

    for (const skill of registeredSkills) {
      if (!skillsById.has(skill.id)) {
        skillsById.set(skill.id, skill)
      }
    }

    return Array.from(skillsById.values())
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }

    throw new Error('Не удалось загрузить навыки')
  }
}
