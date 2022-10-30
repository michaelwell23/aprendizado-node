const express = require('express');
const pessoasController = require('../controllers/pessoas.controllers')

const model = require('../models/index');

const router = express.Router();

router.get('/', pessoasController.index.bind(null, model.models));
router.get('/create', pessoasController.createForm)
router.post('/create', pessoasController.createProcess.bind(null, model.models));
router.get('/delete/:id', pessoasController.deleteOne.bind(null, model.models));
router.get('/edit/:id', pessoasController.editForm.bind(null, model.models));
router.post('/edit/:id', pessoasController.editProcess.bind(null, model.models));

module.exports = router;