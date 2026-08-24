import type { Skill, SkillType } from '@/shared/types'
import type { SkillsState } from './skills-slice'

export type SkillsRootState = {
  skills: SkillsState
}

const selectSkillsState = (state: SkillsRootState): SkillsState => state.skills

export const selectSkills = (state: SkillsRootState): Skill[] => selectSkillsState(state).skills

export const selectSkillById = (state: SkillsRootState, id: string): Skill | undefined =>
  selectSkills(state).find((skill) => skill.id === id)

export const selectSkillsByAuthorId = (state: SkillsRootState, authorId: string): Skill[] =>
  selectSkills(state).filter((skill) => skill.authorId === authorId)

export const selectSkillsByType = (state: SkillsRootState, type: SkillType): Skill[] =>
  selectSkills(state).filter((skill) => skill.type === type)

export const selectTeachSkills = (state: SkillsRootState): Skill[] =>
  selectSkillsByType(state, 'teach')

export const selectLearnSkills = (state: SkillsRootState): Skill[] =>
  selectSkillsByType(state, 'learn')

export const selectSkillsLoading = (state: SkillsRootState): boolean =>
  selectSkillsState(state).loading

export const selectSkillsError = (state: SkillsRootState): string | null =>
  selectSkillsState(state).error
