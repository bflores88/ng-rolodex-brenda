'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');
const Contact = require('../database/models/Contact.js');

router
  .route('/')
  .get((req, res) => {
    let user = req.query.user;

    Contact.where({ created_by: user })
      .fetchAll({ withRelated: ['users'] })
      .then((result) => {
        return res.json(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  })
  .post((req, res) => {
    new Contact({
      name: req.body.name,
      created_by: req.body.created_by,
      address: req.body.address,
    })
      .save()
      .then((result) => {
        return res.json(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
        return res.send(err);
      });
  });

router.route('/search/:term').get((req, res) => {
  let user = req.query.user;
  Contact.query(function(qb) {
    qb.where('created_by', '=', user).andWhere('name', 'LIKE', `%${req.params.term}%`);
  })
    .fetchAll({ withRelated: 'users' })
    .then((result) => {
      return res.json(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
