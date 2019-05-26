'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const registration = require('../middleware/registration');

router.route('/')
  .post(registration, (req, res) => {

    new User('username', req.body.username)
      .fetch()
      .then((userObject) => {
        if (userObject !== null) {
          return res.send('{ error: That username already exists! }')
        }

        return bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            console.log(err);
            return res.send(err);
          }
    
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
              return res.send(err);
            }

            let newUser = checkNewInfo(req.body);
            newUser.password = hash;
    
            return new User(newUser)
              .save()
              .then((user) => {
                return res.json(user.toJSON())
              })
              .catch((err) => {
                return res.send(err);
              });
          });
        });
      })
      .catch((err) => {
        return res.send(err);
      });

  });
    
router.route('/:username')
  .get((req, res) => {
    const user = req.params.username;
    new User({ username: user })
      .fetch({ columns: ['username'] })
      .then((result) => {
        if (!result) {
          return res.json({ username: false })
        }
        return res.json({ username : true })
      })
      .catch((err) => {
        console.log('error', err)
      })
  });

function checkNewInfo(body) {
  const newUserInfo = {};

  if (body.username) {
    newUserInfo.username = body.username;
  }

  if (body.name) {
    newUserInfo.name = body.name;
  }

  if (body.email) {
    newUserInfo.email = body.email;
  }

  if(body.address) {
    newUserInfo.address = body.address;
  }

  return newUserInfo;
}

module.exports = router;