import { Schema, model } from 'mongoose'
const schema = new Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  description: { type: String },
  address: { type: String },
})

const CompanyModel = model('company', schema)
export default CompanyModel
