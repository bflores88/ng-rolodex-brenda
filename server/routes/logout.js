'use strict';

const express = require('express');
const router = express.Router();

router.route('/')
  .post((req, res) => {
    req.logout();
    return res.send('{ success: logged out }')
  })

module.exports = router;