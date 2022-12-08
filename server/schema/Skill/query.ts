import SkillModel from './db'

const SkillQuery = {
  getAllSkills: async () => {
    return await SkillModel.find()
  },
  getSkill: async (_parent, { id }) => {
    return await SkillModel.findById(id)
  },
}

export default SkillQuery
