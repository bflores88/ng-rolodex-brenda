'use strict';

const express = require('express');
const bodyParser = require('body-parser');

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

require('dotenv').config();

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const app = express();

app.use(bodyParser.json());

app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/register', register);
app.use('/api/profile', profile);
app.use('/api/users', users);
app.use('/api/contacts', contacts);


app.get('/api', (req, res) => {
  return res.send('{message: smoke test}')
})


const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
})