const SkillTypes = `type Skill {
    id: ID
    name: String
    isRecent: Boolean
}
type Query {
    getAllSkills: [Skill]
    getSkill(id: ID): Skill
}
input SkillInput{
    name: String!
    isRecent: Boolean
}
type Mutation {
    createSkill(skill: SkillInput!) : Skill
    deleteSkill(id: ID!): ID
    updateSkill(id: ID!, skill: SkillInput!) : Skill
}`

export default SkillTypes
