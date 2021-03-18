const { Schema, model } = require('mongoose')

const companySchema = new Schema({
  name: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
})

module.exports = model('Company', companySchema)
