const labels = [
  { id: 'to-watch', name: 'Para assistir' },
  { id: 'watching', name: 'Assistindo' },
  { id: 'watched', name: 'Assistido' },
];

const index = async ({ Serie }, req, res) => {
  const series = await Serie.find({});
  res.render('series/index', { series, labels });
};

const novaProcess = async ({ Serie }, req, res) => {
  const serie = new Serie(req.body);
  try {
    await serie.save();
    res.redirect('/series');
  } catch (e) {
    res.render('series/nova', {
      errors: Object.keys(e.errors),
    });
  }
};

const novaForm = (req, res) => {
  res.render('series/nova', { errors: [] })
};

const excluir = async ({ Serie }, req, res) => {
  await Serie.remove({ _id: req.params.id });
  res.redirect('/series');
};

const editarForm = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  res.render('series/editar', { serie, labels });
};

const editarProcess = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  serie.name = req.body.name;
  serie.status = req.body.status;
  serie.comments = req.body.comments;
  try {
    await serie.save();
    res.redirect('/series');
  } catch (e) {
    res.render('editar', { serie, labels, errors: Object.keys(e.errors) })
  }
};

module.exports = {
  index,
  novaForm,
  novaProcess,
  excluir,
  editarForm,
  editarProcess,
};
