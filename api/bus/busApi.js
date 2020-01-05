const axios = require('axios');

const logger = require('../../services/logging');

const BusModel = require('../../models/Bus');

class BusApi {
    static async findOne(selectorObject) {
        return BusModel.findOne(selectorObject);
    }

    static async findMany(selectorObject) {
        return BusModel.find(selectorObject);
    }

    static async create(data) {
        const bus = {
            busId: data.id,
            busNumber: data.group_name,
            route: {
                id: data.int_id,
                oppositeRouteId: data.opposite_route_int_id,
                name: data.route_name,
                length: data.length
            }
        };

        const busAlreadyExists = await BusApi.findOne({ busId: bus.busId });

        if (busAlreadyExists) return;

        try {
            const createdBus = await BusModel.create(bus);
        } catch (ex) {
            console.log(ex);
        }
    }

    static async update() {

    }

    static async replace() {

    }

    static async remove() {

    }
}

module.exports = BusApi;