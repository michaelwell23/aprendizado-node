const express = require('express');
const seriesController = require('../controllers/series');

const Serie = require('../models/serie');

const router = express.Router();
const models = {
  Serie
}

router.get('/nova', seriesController.novaForm);
router.get('/', seriesController.index.bind(null, models));

router.get('/excluir/:id', seriesController.excluir.bind(null,models));
router.post('/nova', seriesController.novaProcess.bind(null, models));

router.get('/editar/:id', seriesController.editarForm.bind(null,models));
router.post('/editar/:id', seriesController.editarProcess.bind(null,models));

module.exports = router;