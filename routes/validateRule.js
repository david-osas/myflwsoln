const express = require('express');
const ruleController = require('../controllers/validateRule');
const router = express.Router();

router.post('/', ruleController.checkBody, ruleController.validateRule);

module.exports = router;
