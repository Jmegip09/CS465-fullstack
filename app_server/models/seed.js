const mongoose = require('mongoose');
const Trip = require('./Travlr');
const fs = require('fs');

// Connect to database
const dbURI = 'mongodb://127.0.0.1:27017/travlr';
mongoose.connect(dbURI);

// Read JSON file
const trips = JSON.parse(
    fs.readFileSync('./data/trips.json', 'utf8')
);

// Seed database
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Database seeded!');
    mongoose.connection.close();
};

seedDB();