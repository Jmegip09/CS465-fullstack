const express = require('express');
const router = express.Router();

const ctrlTravel = require('../controllers/Travlr');

router.get('/', ctrlTravel.tripsList);
router.get('/', ctrlTravel.renderTravel);


// API endpoint
router.get('/api/trips', ctrlTravel.tripsList);

module.exports = router;
