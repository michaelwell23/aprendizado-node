const express = require('express');
const path = require('path');
const mysql = require('mysql')
const bodyParser = require('body-parser');

const pessoas = require('./routes/pessoas');

const port = process.env.PORT || 3000

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Cadastro'
})

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const dependencies = { connection }
app.use(express.static('public'))

app.get('/', (req, res) => res.render('home'));
app.use('/pessoas', pessoas(dependencies))

// view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

connection.connect(() => {
  app.listen(port, () => console.log(`App listening on port ${port}`));
})