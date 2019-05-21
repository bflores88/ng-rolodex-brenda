const express = require('express');
const bodyParser = require('body-parser');

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

const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
})