const express = require('express');
const indexController = require('../controllers/index');
const router = express.Router();

router.get('/', indexController.user);

router.post('/validate-rule', indexController.validateRule);

module.exports = router;
