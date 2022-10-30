const express = require('express');
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const jwtSecret = 'abc123abc123abc123'
const router = express.Router()

router.get('/:id', async(req, res) => {
  const user = await User.findOne({_id: req.params.id})
  res.send(user);
})

router.post('/', async(req, res) => {
  const user = new User(req.body);
  try{
    await user.save()
    res.send(user)
  }catch(e){
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
})

router.put('/:id', async(req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  user.username = req.body.username,
  user.password = req.body.password,
  user.roles = 'restrito'
  try {
    await user.save()
    res.send(user)
  }catch(e){
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
})

router.use(async(req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token
  if(token){
    try {
      const payload = jwt.verify(token, jwtSecret)
      if(payload.roles.indexOf('admin')>= 0){
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
  const users = await User.find({})
  res.send(users);
})

// router.delete('/:id', async(req, res) => {
//   await Livro.deleteOne({ _id: req.params.id })
//   res.send({
//     success: true
//   })
// })

module.exports = router;
