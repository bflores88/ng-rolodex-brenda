'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');
const Contact = require('../database/models/Contact.js');

router.route('/index')
  .get((req, res) => {

  })

module.exports = router;