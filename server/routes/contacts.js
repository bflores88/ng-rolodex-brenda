'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');
const Contact = require('../database/models/Contact.js');

router
  .route('/')
  .get((req, res) => {
    let user = req.query.user;

    Contact.forge()
      // .where({ created_by: user })
      .orderBy('name', 'ASC')
      .fetchAll({ withRelated: ['users'] })
      .then((result) => {
        return res.json(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  })
  .post((req, res) => {
    console.log('********', req.body)
    new Contact(checkBodyUpdates(req.body))
      .save()
      .then((result) => {
        return res.json(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
        return res.send(err);
      });
  });

router.route('/:id')
  .get((req, res) => {
    new Contact({ id: req.params.id })
      .fetch({ withRelated: ['users'] })
      .then((result) => {
        return res.json(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
    })
  })
  .put((req, res) => {
    new Contact({ id: req.params.id })
      .save(checkBodyUpdates(req.body))
      .then((result) => {
        return res.json(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
    })
  })
  .delete((req, res) => {
    new Contact({ id: req.params.id })
      .destroy()
      .then((result) => {
        return res.json(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
    })
  })

router.route('/search/:term').get((req, res) => {
  let user = req.query.user;
  console.log(req.params.term)
  Contact.query(function (qb) {
    qb.where("name", 'LIKE', `%${req.params.term}%`);
    // qb.where('created_by', '=', user).andWhere('name', 'LIKE', `%${req.params.term}%`);
  })
    .fetchAll({ withRelated: 'users' })
    .then((result) => {
      return res.json(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

function checkBodyUpdates(requestBody) {
  let updatedContact = {};

  if (requestBody.name) {
    updatedContact.name = requestBody.name;
  }

  if (requestBody.address) {
    updatedContact.address = requestBody.address;
  }

  if (requestBody.mobile) {
    updatedContact.mobile = requestBody.mobile;
  }

  if (requestBody.work) {
    updatedContact.work = requestBody.work;
  }

  if (requestBody.home) {
    updatedContact.home = requestBody.home;
  }

  if (requestBody.email) {
    updatedContact.email = requestBody.email;
  }

  if (requestBody.twitter) {
    updatedContact.twitter = requestBody.twitter;
  }

  if (requestBody.instagram) {
    updatedContact.instagram = requestBody.instagram;
  }

  if (requestBody.github) {
    updatedContact.github = requestBody.github;
  }

  if (requestBody.created_by) {
    updatedContact.created_by = requestBody.created_by;
  }

  return updatedContact;

}

module.exports = router;
