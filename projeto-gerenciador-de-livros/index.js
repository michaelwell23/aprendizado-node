const mongoose = require('mongoose');

const app = require('./app')
const User = require('./models/user');

const port = process.env.PORT || 3001;

const mongo = 'mongodb://localhost:27017/meus-livros';
mongoose.Promise = global.Promise

const createInitialUser = async() => {
  const total = await User.countDocuments({});
  if(total === 0){
    const user = new User({
      username: 'admin',
      password: '123456',
      roles: ['restrito','admin']
    })
    await user.save();

    const user2 = new User({
      username: 'michaelwell',
      password: '123456',
      roles: ['restrito']
    })
    await user2.save();
  }
}

mongoose
  .connect(mongo, { 
    useMongoClient: true,
  })
  .then(() => {
    createInitialUser()
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch((e) => console.log(e));
