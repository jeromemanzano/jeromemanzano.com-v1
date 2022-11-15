import type { ICompanyModel } from '../company/company-model'
import type { ISkillModel } from '../skill/skill-model'

export interface IExperienceModel {
  company: ICompanyModel
  skills: ISkillModel[]
  position: string
  startDate: string
  roles: string[]
  endDate?: string
  id: string
}
