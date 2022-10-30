const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user');

const router = express.Router()

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

//definindo a estratégia de login local
passport.use(new LocalStrategy(async(username, password, done) => {
  const user = await User.findOne({username})
  if(user){
    const isValid = await user.checkPassword(password)
    if(isValid){
      return done(null, user);
    }else{
      return done(null, false);
    }
  }else{
    return done(null, false);
  }
}))

// facebook
passport.use(new FacebookStrategy({
  clientID: '508777874592277',
  clientSecret: 'e1f19775c9659e7cc98173d58a34854d',
  callbackURL: 'http://localhost:3003/facebook/callback',
  profileFields: ['id', 'displayName', 'email', ]
}, async(accessToken, refreshToken, profile, done) => {
  const userDB = await User.findOne({ facebookId: profile.id })
  if(!userDB){
    const user = new User({
      name: profile.displayName,
      facebookId: profile.id,
      roles: ['restrito']
    })
    await user.save()
    done(null, user)
  }else{
    done(null, userDB)
  }
}))

router.use((req, res, next) => {
  if(req.isAuthenticated()){
    res.locals.user = req.user
    if(!req.session.role){
      req.session.role = req.user.roles[0]
    }
    res.locals.role = req.session.role
  }
  next()
})

router.get('/change-role/:role', (req, res) => {
  if(req.isAuthenticated()){
    if (req.user.roles.indexOf(req.params.role) >= 0){
      req.session.role = req.params.role;
    }
  }  
  res.redirect('/');
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false,
}))
router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
)

module.exports = router;