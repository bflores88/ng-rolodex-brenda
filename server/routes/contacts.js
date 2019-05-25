'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');
const Contact = require('../database/models/Contact.js');
const knex = require('../database/knex');

router
  .route('/')
  .get((req, res) => {
    let user = req.query.user;

    Contact.forge()
      .where({ created_by: user })
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
    const user = req.body.created_by
    new Contact({ id: req.params.id })
      .save(checkBodyUpdates(req.body))
      .then((result) => {
        return Contact.forge()
        .where({ created_by: user })
        .orderBy('name', 'ASC')
        .fetchAll({ withRelated: ['users'] })
        .then((result) => {
          return res.json(result.toJSON());
        })
        .catch((err) => {
          console.log('error', err);
        });
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
  let search = req.params.term
  let lowerSearch = search.toLowerCase()

  knex('contacts')
  .where(
    knex.raw('"created_by" = ? AND LOWER("name") LIKE ?', [user, `%${lowerSearch}%`]))
    .then((result) => {
      return res.json(result);
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

  console.log('******', updatedContact)
  return updatedContact;

}

module.exports = router;
