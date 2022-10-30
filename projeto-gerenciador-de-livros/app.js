const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors')
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express')

const swaggerDoc = YAML.load('./swagger.yaml');
const User = require('./models/user');
const livros = require('./routes/livros');
const users = require('./routes/users');

const jwtSecret = 'abc123abc123abc123'

const app = express();

app.use(cors())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/auth', async(req,res)=> {
  const user = req.body
  const userDB = await User.findOne({ username: user.username })
  if(userDB){
    if(userDB.password === user.password){
      const payload = {
        id: userDB._id,
        username: userDB.username,
        roles: userDB.roles
      }
      jwt.sign(payload, jwtSecret, (err, token) => {
        res.send({
          success: true,
          username: userDB.username,
          token: token,
        })
      })
    } else {
      res.status('404').send({ success: false, message: 'Wrong Credentials'})
    }
  } else {
    res.status('404').send({ success: false, message: 'Wrong Credentials'})
  }
})

app.use('/', livros);
app.use('/users', users);

module.exports = app