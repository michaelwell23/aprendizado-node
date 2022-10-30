const PdfPrinter = require('pdfmake');
const fs = require('fs');

const express = require('express')
const app = express()
const port = 3003

const data = require('./data.json')

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf',
  },
};

const lines = [];
lines.push([
  {
    text: 'Nome',
    style: 'header',
  },
  {
    text: 'E-mail',
    style: 'header',
  },
  {
    text: 'Situação',
    style: 'header',
  },
]);

data.forEach(user => {
  let ativo = 'ativo'

  if(lines.length % 2 === 0){
    ativo = { text: 'inativo', style: 'inativo'}
  }

  lines.push([user.name, user.email, ativo])
 })

const printer = new PdfPrinter(fonts);
const docDefinition = {
  content: [
    {
      image: './images/logo.png',
      width: 186,
      alignment: 'center',
     },
    { 
      text: 'TABELA DE PESSOAS',
      style: 'title', 
    },
    {
      table: {
        widths: ['*', '*', 100],
        body: lines,
      },
    },
  ],
  styles: {
    header: {
      fontSize: 12,
      bold: true,
    },
    title: {
      fontSize: 22,
      bold: true,
      color: '#FF0000',
    },
    inativo: {
      fontSize: 12,
      bold: '#C0C0C0'
    }
  },
  footer: (page, pages) => {
    return {
      columns: [
        {
          alignment: 'right',
          text: [
            {text: page.toString(), italics: true},
            ' de ',
            {text: pages.toString(), italics: true}
          ]
        }
      ],
      margin: [40, 0]
    }
  }
};

app.get('/', (req, res) => {
  const pdf = printer.createPdfKitDocument(docDefinition)
  res.header('Content-disposition', 'inline; filename=neu-pdf.pdf')
  res.header('Content-type', 'application/pdf')
  pdf.pipe(res)
  pdf.end()
})


// const pdf = printer.createPdfKitDocument(docDefinition);
// pdf.pipe(fs.createWriteStream('doc.pdf'));
// pdf.end();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))