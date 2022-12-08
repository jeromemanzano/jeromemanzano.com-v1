import CompanyModel from './db'

const CompanyMutation = {
  createCompany: async (_parent, args, context) => {
    if (!context.admin) return args.company

    const { name, website, description, address } = args.company
    const company = new CompanyModel({ name, website, description, address })

    await company.save()

    return company
  },
  deleteCompany: async (_parent, { id }, context) => {
    if (context.admin) {
      await CompanyModel.findByIdAndDelete(id)
    }
    return id
  },
  updateCompany: async (_parent, args, context) => {
    if (!context.admin) return args.company

    const { id } = args
    const { name, website, description, address } = args.company

    const company = await CompanyModel.findByIdAndUpdate(id, { name, description, website, address }, { new: true })

    return company
  },
}

export default CompanyMutation
