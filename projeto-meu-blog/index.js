const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

const User = require('./models/user');

const noticias = require('./routes/noticia');
const restrito = require('./routes/restrito');
const auth = require('./routes/auth');
const pages = require('./routes/pages');
const admin = require('./routes/admin');

mongoose.Promise = global.Promise

const mongo = 'mongodb://localhost/noticias';

const port = 3003
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'projeto-noticias', resave: true, saveUninitialized: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use('/', auth);
app.use('/', pages);
app.use('/restrito', restrito);
app.use('/noticias', noticias);
app.use('/admin', admin);

const createInitialUser = async() => {
  const total = await User.count({})
  if(total === 0){
    const user = new User({
      username: 'useradmin',
      password: '123456',
      roles: ['restrito', 'admin']
    })
    await user.save()

    const user2 = new User({
      username: 'sollarstone',
      password: '123456',
      roles: ['restrito']
    })
    await user2.save()

  }

  // const noticiaPublic = new Noticia({
  //   title: 'News Public template #3',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper posuere feugiat. Fusce quis lorem diam. Donec elementum purus eros, ut lacinia eros congue in.',
  //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus urna sed orci tincidunt, nec tempus nisl hendrerit. Mauris id mauris lectus. Donec non viverra odio. Aenean lobortis ex accumsan ultrices lobortis. Sed tempor eros non laoreet fermentum. Sed euismod scelerisque risus quis aliquet. Maecenas hendrerit euismod arcu, nec malesuada massa lacinia eu. Aenean quis suscipit sem. Aliquam lacus sem, efficitur id mattis ac, tristique non sem. Sed vitae vehicula enim. Maecenas sed est luctus, pharetra nisl in, cursus massa. Pellentesque auctor, enim at vulputate porttitor, risus purus ornare velit, ut porttitor justo lorem in felis. Cras pretium augue vel eros pellentesque, a auctor dolor commodo. Nullam eu nibh dolor. Integer eget sem mauris. Nunc nibh lorem, accumsan sit amet lobortis posuere, elementum eget turpis. Curabitur cursus justo id convallis molestie. Maecenas pretium eget dolor et varius. Nulla feugiat mi non nibh ornare consequat. Integer eleifend sed nulla vitae maximus. Quisque vestibulum sem eu bibendum tristique. In vulputate eros mauris, et mollis mauris malesuada ac. Proin quis neque ut felis ultricies hendrerit.',
  //   category: 'public',
  // })
  // await noticiaPublic.save()

  // const noticiaPrivate = new Noticia({
  //   title: 'News Private template #3',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper posuere feugiat. Fusce quis lorem diam. Donec elementum purus eros, ut lacinia eros congue in.',
  //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus urna sed orci tincidunt, nec tempus nisl hendrerit. Mauris id mauris lectus. Donec non viverra odio. Aenean lobortis ex accumsan ultrices lobortis. Sed tempor eros non laoreet fermentum. Sed euismod scelerisque risus quis aliquet. Maecenas hendrerit euismod arcu, nec malesuada massa lacinia eu. Aenean quis suscipit sem. Aliquam lacus sem, efficitur id mattis ac, tristique non sem. Sed vitae vehicula enim. Maecenas sed est luctus, pharetra nisl in, cursus massa. Pellentesque auctor, enim at vulputate porttitor, risus purus ornare velit, ut porttitor justo lorem in felis. Cras pretium augue vel eros pellentesque, a auctor dolor commodo. Nullam eu nibh dolor. Integer eget sem mauris. Nunc nibh lorem, accumsan sit amet lobortis posuere, elementum eget turpis. Curabitur cursus justo id convallis molestie. Maecenas pretium eget dolor et varius. Nulla feugiat mi non nibh ornare consequat. Integer eleifend sed nulla vitae maximus. Quisque vestibulum sem eu bibendum tristique. In vulputate eros mauris, et mollis mauris malesuada ac. Proin quis neque ut felis ultricies hendrerit.',
  //   category: 'private',
  // })
  // await noticiaPrivate.save() 
}

mongoose.connect(mongo)
  .then(() => {
    createInitialUser()
    app.listen(port, () => console.log(`App listening on port ${port}!`))
}).catch(err => console.log(err));

