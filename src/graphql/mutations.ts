import gql from 'graphql-tag'

//Skills mutations
const SKILL_FRAGMENT = `{
  name
  category
  id
  iconUrl
}`

export const CREATE_SKILL_MUTATION = gql`
  mutation createSkill($skill: SkillInput!) {
    createSkill(skill: $skill) ${SKILL_FRAGMENT}
  }
`

export const UPDATE_SKILL_MUTATION = gql`
  mutation updateSkill($id: ID!, $skill: SkillInput!) {
    updateSkill(id: $id, skill: $skill) ${SKILL_FRAGMENT}
  }
`

export const DELETE_SKILL_MUTATION = gql`
  mutation deleteSkill($id: ID!) {
    deleteSkill(id: $id)
  }
`
//Company mutation
const COMPANY_FRAGMENT = `{
  address
  description
  name
  id
  website
}`

export const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany($company: CompanyInput!) {
    createCompany(company: $company) ${COMPANY_FRAGMENT}
  }
`

export const UPDATE_COMPANY_MUTATION = gql`
  mutation updateCompany($id: ID!, $company: CompanyInput!) {
    updateCompany(id: $id, company: $company) ${COMPANY_FRAGMENT}
  }
`

export const DELETE_COMPANY_MUTATION = gql`
  mutation deleteCompany($id: ID!) {
    deleteCompany(id: $id)
  }
`

//Company mutation
const EXPERIENCE_FRAGMENT = `{
  id
  company ${COMPANY_FRAGMENT}
  skills ${SKILL_FRAGMENT}
  position
  startDate
  endDate
  roles
}`

export const CREATE_EXPERIENCE_MUTATION = gql`
  mutation createExperience($experience: ExperienceInput!) {
    createExperience(experience: $experience) ${EXPERIENCE_FRAGMENT}
  }
`

export const UPDATE_EXPERIENCE_MUTATION = gql`
  mutation updateExperience($id: ID!, $experience: ExperienceInput!) {
    updateExperience(id: $id, experience: $experience) ${EXPERIENCE_FRAGMENT}
  }
`

export const DELETE_EXPERIENCE_MUTATION = gql`
  mutation deleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`
