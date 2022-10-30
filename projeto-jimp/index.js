const Jimp = require('jimp');
const express = require('express')
const app = express()
const port = 3000

const empresas = require('./empresas');

const genImage = async (text) => {
  const image = await new Jimp(200, 40)
  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
  image.print(font, 0,0, text)
  return image
}
// genImage();

app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index', { empresas }))
app.get('/image/:indice', async(req, res) => {
  const image = await genImage(empresas[req.params.indice].telefone)
  const buffer = await image.getBuffer(Jimp.MIME_PNG, (err, data) => {
    res.header('Content-type', 'image/png')
    res.send(data)
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))