const CompanyTypes = `type Company {
    id: ID
    name: String
    description: String
    address: String
    website: String
}
type Query {
    getAllCompanies: [Company]
    getCompany(id: ID): Company
}
input CompanyInput{
    name: String!
    description: String
    address: String
    website: String
}
type Mutation {
    createCompany(company: CompanyInput!) : Company
    deleteCompany(id: ID!): ID
    updateCompany(id: ID!, company: CompanyInput!) : Company
}`

export default CompanyTypes
