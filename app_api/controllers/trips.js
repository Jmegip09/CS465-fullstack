const mongoose = require('mongoose');
const Trip = require('../models/Travlr');
const Model = mongoose.model('trips');

// GET: /api/trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// GET: /api/trips/:tripCode - get a single trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.findOne({ code: req.params.tripCode }).exec();

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// POST: /api/trips - add a trip
const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

const tripsUpdateTrip = async (req, res) => {
    const tripCode = req.params.tripCode;

    try {
        const trip = await Trip.findOneAndUpdate(
            { code: tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        );

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ message: 'Error updating trip', error: err });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
