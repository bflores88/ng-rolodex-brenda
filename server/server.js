'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./database/models/User');

const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const profile = require('./routes/profile');
const users = require('./routes/users');
const contacts = require('./routes/contacts');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const redis = require('connect-redis')(session);
const guard = require('./middleware/guard');

require('dotenv').config();

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    store: new redis({ url: process.env.REDIS_URL }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function(username, password, done) {
    return new User({ username: username })
      .fetch()
      .then((user) => {
        if (user === null) {
          return done(null, false, { message: 'bad username or password' });
        } else {
          user = user.toJSON();

          bcrypt
            .compare(password, user.password)
            .then((res) => {
              //Happy route: username exists, password matches
              if (res) {
                return done(null, user);
              }

              //Error route: Username exists, password does not match
              else {
                return done(null, false, { message: 'bad username or password' });
              }
            })
            .catch((err) => {
              console.log('err', err);
              return done(err);
            });
        }
      })
      .catch((err) => {
        console.log('err', err);
        return done(err);
      });
  }),
);

passport.serializeUser(function(user, done) {
  console.log('serializing');
  console.log(user);
  return done(null, { id: user.id, username: user.username});
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  console.log(user);

  return new User({ id: user.id })
    .fetch()
    .then((user) => {
      user = user.toJSON();

      done(null, {
        id: user.id,
        username: user.username,
        email: user.email
      });
    })
    .catch((err) => {
      console.log('err', err);
      return done(err);
    });
});

app.use('/api/login', login);
app.use('/api/register', register);

app.use(guard, (req, res, next) => {
  next();
});

app.use('/api/logout', logout);
app.use('/api/profile', profile);
app.use('/api/users', users);
app.use('/api/contacts', contacts);


app.get('/api', (req, res) => {
  return res.send('{message: smoke test}')
})


const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
})