import CompanyModel from './db'

const CompanyQuery = {
  getAllCompanies: async () => {
    return await CompanyModel.find()
  },
  getCompany: async (_parent, { id }) => {
    return await CompanyModel.findById(id)
  },
}

export default CompanyQuery
