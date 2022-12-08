import ExperienceModel from './db'

const ExperienceQuery = {
  getAllExperiences: async () => {
    return await ExperienceModel.find().populate('company').populate('skills')
  },
  getExperience: async (_parent, { id }) => {
    return await ExperienceModel.findById(id)
  },
}

export default ExperienceQuery
