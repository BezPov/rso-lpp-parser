const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busId: {
        type: String,
        required: true
    },
    busNumber: String,
    route: {
        id: Number,
        oppositeRouteId: Number,
        name: String,
        length: Number
    }
});

module.exports = mongoose.model('Bus', busSchema);