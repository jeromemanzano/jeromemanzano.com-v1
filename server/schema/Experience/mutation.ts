import ExperienceModel from './db'
import CompanyModel from '../Company/db'
import SkillModel from '../Skill/db'

const ExperienceMutation = {
  createExperience: async (_parent, args, context) => {
    if (!context.admin) return args.experience

    const { companyId, position, startDate, endDate, roles, skillIds } = args.experience
    const company = await CompanyModel.findById(companyId)
    const skills = await SkillModel.find({ _id: { $in: skillIds } })

    //TODO: handle if company is invalid
    const experience = new ExperienceModel({ company, position, startDate, endDate, roles, skills })
    await experience.save()
    return experience
  },
  deleteExperience: async (_parent, { id }, context) => {
    if (context.admin) {
      await ExperienceModel.findByIdAndDelete(id)
    }
    return id
  },
  updateExperience: async (_parent, args, context) => {
    if (!context.admin) return args.experience

    const { id } = args
    const { companyId, position, startDate, endDate, roles, skillIds } = args.experience

    const company = await CompanyModel.findById(companyId)
    const skills = await SkillModel.find({ _id: { $in: skillIds } })
    const experience = await ExperienceModel.findByIdAndUpdate(
      id,
      { company, position, startDate, endDate, roles, skills },
      { new: true }
    )
      .populate('company')
      .populate('skills')

    return experience
  },
}

export default ExperienceMutation
