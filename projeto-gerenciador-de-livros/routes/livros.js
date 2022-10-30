const express = require('express');
const jwt = require('jsonwebtoken')

const Livro = require('../models/livros');

const jwtSecret = 'abc123abc123abc123'
const router = express.Router()

router.use(async(req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token
  if(token){
    try {
      const payload = jwt.verify(token, jwtSecret)
      if(payload.roles.indexOf('restrito')>=0){
        next()
      } else {
        res.send({ success: false })
      }
    }catch(e){
      res.send({ success: false })
    }
  }else {
    res.send({ success: false })
  }
})

router.get('/', async (req, res) => {
  const livros = await Livro.find({})
  res.send(livros);
})

router.post('/', async(req, res) => {
  const livro = new Livro(req.body);
  try{
    await livro.save()
    res.send(livro)
  }catch(e){
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
})

router.delete('/:id', async(req, res) => {
  await Livro.deleteOne({ _id: req.params.id })
  res.send({
    success: true
  })
})

router.get('/:id', async(req, res) => {
  const livro = await Livro.findOne({_id: req.params.id})
  res.send(livro);
})

router.put('/:id', async(req, res) => {
  const livro = await Livro.findOne({ _id: req.params.id })
  livro.status = req.body.status;
  try {
    await livro.save()
    res.send(livro)
  }catch(e){
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
})

module.exports = router;
