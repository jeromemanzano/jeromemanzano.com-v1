import { Schema, model } from 'mongoose'
const schema = new Schema({
  name: { type: String, required: true },
  isRecent: { type: Boolean, default: false },
})

const SkillModel = model('skill', schema)
export default SkillModel
