const mongoose = require('mongoose');
const Trip = require('../models/Travlr');
const Model = mongoose.model('trips');

// GET: /api/trips - lists all the trips
const tripsList = async (req, res) => {
    const q = await Model
        .find({})
        .exec();

    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

// GET: /api/trips/:tripCode - lists a single trip by code field
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })  // ← search by code, not _id
        .exec();

    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};