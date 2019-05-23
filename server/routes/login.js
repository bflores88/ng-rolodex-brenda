'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post(
  '/',
  passport.authenticate('local'), (req, res) => {
    return res.json('{ success: true }')
  }
);



module.exports = router;