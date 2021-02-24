const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.list);

router.route('/api/users/:userId')
  .get(userCtrl.profile);

module.exports = router;
