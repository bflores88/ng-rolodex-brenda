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
        if(userObject !== null){
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
    
            return new User({
              username: req.body.username,
              password: hash,
              name: req.body.name,
              email: req.body.email,
              address: req.body.address
            })
              .save()
              .then((user) => {
                return res.send(user)
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

  })

// function checkEditedInformation(body) {
//   const updatedInfo = {};

//   if (body.username) {
//     updatedInfo.username = body.username;
//   }

//   if (body.name) {
//     updatedInfo.name = body.name;
//   }

//   if (body.email) {
//     updatedInfo.email = body.email;
//   }

//   if(body.address) {
//     updatedInfo.address = body.address;
//   }

//   return updatedInfo;
// }

module.exports = router;