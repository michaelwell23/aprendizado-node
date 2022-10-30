const index = (req, res) => res.render('index');
const sobre = (req, res) => res.render('sobre.ejs');

module.exports = {
  index,
  sobre,
};
