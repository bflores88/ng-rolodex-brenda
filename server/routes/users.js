'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');

router.route('/')
  .put((req, res) => {
    const user = req.query.user;
    new User({ id: user })
      .save(checkEditedInformation(req.body))
      .then((result) => {
        return res.send(result);
      })
      .catch((err) => {
        console.log('error', err);
    })
  })

router.route('/:username')
  .get((req, res) => {
    const user = req.params.username;
    new User({ username: user })
      .fetch()
      .then((result) => {
        console.log(result)
        return res.json(result.toJSON())
      })
      .catch((err) => {
      console.log('error', err)
    })
})


function checkEditedInformation(body) {
  const updatedInfo = {};

  if (body.username) {
    updatedInfo.username = body.username;
  }

  if (body.name) {
    updatedInfo.name = body.name;
  }

  if (body.email) {
    updatedInfo.email = body.email;
  }

  if(body.address) {
    updatedInfo.address = body.address;
  }

  return updatedInfo;
}

module.exports = router;