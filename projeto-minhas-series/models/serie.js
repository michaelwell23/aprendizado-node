const mongoose = require('mongoose');

const SerieSchema = mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enumValues: ['to-watch', 'watching','watched']
  },
  comments: {
    type: [String]
  }
})
const Serie = mongoose.model('Serie', SerieSchema)

module.exports = Serie;