'use strict';

const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    console.log('clicked logout')
    req.logout();
    return res.json({ success: "logged out" })
  })
 
module.exports = router;