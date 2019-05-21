'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');

router.route('/')
  .get((req, res) => {

  })

router.route('/auth')
.get((req, res) => {

})

module.exports = router;