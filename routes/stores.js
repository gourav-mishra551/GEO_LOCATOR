const express = require('express');
const {getStore} = require('../controller/store');

const router = express.Router();

router.route('/').get(getStore);

module.exports = router;