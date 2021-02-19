const express = require('express');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.route('/auth/signup')
  .post(authCtrl.create);

module.exports = router;
