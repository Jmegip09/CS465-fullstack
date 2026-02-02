const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const travelController = require('../controllers/Travlr');

router.get('/api/trips', travelController.tripsList);
router.get('/', ctrlMain.renderIndex);

module.exports = router;