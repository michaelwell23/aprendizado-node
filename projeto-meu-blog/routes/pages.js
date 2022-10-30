const express = require('express');
const Noticia = require('../models/noticia');

const router = express.Router()

router.get('/', async(req, res) => { 
const noticias = await Noticia.find({ category: 'public' });
  res.render('index', { noticias })
})

router.get('/noticia/:id', async(req, res) => {
  const noticia = await Noticia.findById({_id: req.params.id})
  res.render('noticias/pages/noticia', { noticia })
})

module.exports = router;