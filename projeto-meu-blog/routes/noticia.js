const express = require('express');

const Noticia = require('../models/noticia');

const router = express.Router()

router.get('/', async(req, res) => {
  let conditions = { category: 'public'}
  // if(!('user' in req.session)){
  //   conditions = { category: 'public'}
  // }
  const noticias = await Noticia.find(conditions);
  res.render('noticias/index', { noticias });
})

router.get('/:id', async(req, res) => {
  const noticia = await Noticia.findById({_id: req.params.id})
  res.render('noticias/pages/noticia', { noticia })
})

module.exports = router;