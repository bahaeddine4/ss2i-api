const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true }
})

module.exports = model('Review', reviewSchema)
