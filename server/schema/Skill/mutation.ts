import SkillModel from './db'

const SkillMutation = {
  createSkill: async (_parent, args, context) => {
    if (!context.admin) return args.skill

    const { name, isRecent } = args.skill
    const skill = new SkillModel({ name, isRecent })
    await skill.save()
    return skill
  },
  deleteSkill: async (_parent, { id }, context) => {
    if (context.admin) {
      await SkillModel.findByIdAndDelete(id)
    }
    return id
  },
  updateSkill: async (_parent, args, context) => {
    if (!context.admin) return args.skill

    const { id } = args
    const { name, isRecent } = args.skill
    const skill = await SkillModel.findByIdAndUpdate(id, { name, isRecent }, { new: true })

    return skill
  },
}

export default SkillMutation
