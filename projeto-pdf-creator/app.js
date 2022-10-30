const data = require('./data.json')

const lines = [];

data.forEach(user => {
  let ativo = 'ativo'

  if(lines.length % 2 === 0){
    ativo = { text: 'inativo', style: 'inativo'}
  }

  lines.push([user.name, user.email, ativo])
 })

 console.log(lines)