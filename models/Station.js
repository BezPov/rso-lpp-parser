const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    stationId: {
        type: String,
        required: true,
        unique: true
    },
    referenceId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    type: String,
    location: {
        type: {
            type: String
        },
        coordinates: Array
    },
    routes: [
        {
            _id: false,
            busNumber: String
        }
    ]
});

module.exports = mongoose.model('Station', stationSchema);