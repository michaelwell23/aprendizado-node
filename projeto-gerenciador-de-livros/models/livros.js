const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  comment: String,
})

const LivroSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enumValues: ['não lido', 'lendo', 'lido']
  },
  
  comments: [CommentSchema]
})

const Livro = mongoose.model('Livro', LivroSchema)

module.exports = Livro;