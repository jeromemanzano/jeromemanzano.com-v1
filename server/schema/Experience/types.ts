const ExperienceTypes = `type Experience {
    id: ID
    company: Company
    skills: [Skill]
    position: String
    startDate: String
    endDate: String
    roles: [String]
}
type Query {
    getAllExperiences: [Experience]
    getExperience(id: ID): Experience
}
input ExperienceInput{
    companyId: ID!
    position: String!
    startDate: String!
    endDate: String
    roles: [String]
    skillIds: [ID]
}
type Mutation {
    createExperience(experience: ExperienceInput!) : Experience
    deleteExperience(id: ID!): ID
    updateExperience(id: ID!, experience: ExperienceInput!) : Experience
}`

export default ExperienceTypes
