'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');

router.route('/').get((req, res) => {
  const user = req.query.user;
  console.log(user);
  new User({ id: user })
    .fetch({columns: ['username', 'id', 'name', 'email', 'address']})
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
