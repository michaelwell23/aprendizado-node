require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const pages = require('./routes/pages');
const series = require('./routes/series');

const app = express();

const mongo = process.env.MONGO_DB;
mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;

// PROCESS REQUEST BODY
app.use(bodyParser.urlencoded({ extended: true }))

// ASSETS
app.use(express.static('public'))

// view engine - EJS 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use('/', pages);
app.use('/series', series);

mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
