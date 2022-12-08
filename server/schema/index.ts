import { CompanyQuery, CompanyMutation, CompanyTypes } from './Company'
import { ExperienceQuery, ExperienceMutation, ExperienceTypes } from './Experience'
import { SkillQuery, SkillMutation, SkillTypes } from './Skill'

import { gql } from 'graphql-tag'

const resolvers = {
  Query: {
    ...CompanyQuery,
    ...ExperienceQuery,
    ...SkillQuery,
  },
  Mutation: {
    ...CompanyMutation,
    ...ExperienceMutation,
    ...SkillMutation,
  },
}

const typeDefs = gql`
    ${CompanyTypes},
    ${ExperienceTypes},
    ${SkillTypes}
`

export { typeDefs, resolvers }
