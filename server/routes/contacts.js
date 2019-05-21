'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');
const Contact = require('../database/models/Contact.js');

router.route('/').get((req, res) => {
  let user = req.query.user;

  Contact.where({ created_by: user })
    .fetchAll({ withRelated: ['users'] })
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
