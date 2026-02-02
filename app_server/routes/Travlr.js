const express = require('express');
const router = express.Router();
const ctrlTravel = require('../controllers/Travlr');

router.get('/', ctrlTravel.renderTravel);

module.exports = router;