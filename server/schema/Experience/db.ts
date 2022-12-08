import { Schema, model } from 'mongoose'
const schema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'company' },
  skills: [{ type: Schema.Types.ObjectId, ref: 'skill' }],
  position: { type: String, required: true },
  startDate: { type: String, required: true },
  roles: { type: [String] },
  endDate: { type: String },
})

const ExperienceModel = model('experience', schema)
export default ExperienceModel
