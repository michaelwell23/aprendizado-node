const Sequelize = require('sequelize');

const fs = require('fs');
const path = require('path');

const models = {}

const sequelize = new Sequelize('Cadastro-ORM', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1',
  password: '',
})

fs
  .readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    models[model.name] = model;
  })


module.exports = {
  sequelize,
  models,
}