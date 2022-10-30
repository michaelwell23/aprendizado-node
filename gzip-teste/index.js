const express = require('express')
const compression = require('compression')

const app = express()
const port = 3000

const largeObject = [];
for(let i = 0; i < 10000; i++){
  largeObject.push(
    {
      name: 'Ethelbert Goodfield',
      gender: 'Male',
      addreess: '047 Mallory Hill',
      phone: '(117) 9897985',
    },
  )
}

app.use(compression())
app.get('/', (req, res) => {
  res.header('Cache-Control', 'public, max-age=3600')
  res.send(largeObject) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))