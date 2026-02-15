// app_server/routes/index.js
const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

// Home page
router.get('/', ctrlMain.renderIndex);

module.exports = router;