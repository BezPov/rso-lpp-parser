const axios = require('axios');

const logger = require('../../services/logging');

const StationModel = require('../../models/Station');

class StationApi {
    static async findOne(selectorObject) {
        return StationModel.findOne(selectorObject);
    }

    static async findMany(selectorObject = {}, options = {}) {
        let operation = StationModel.find(selectorObject);

        if (options.skip) operation = operation.skip(options.skip);

        if (options.limit) operation = operation.limit(options.limit);

        return operation;
    }

    static async create(data) {
        const stationAlreadyExists = await StationApi.findOne({ stationId: data.int_id });

        if (stationAlreadyExists) return;

        const station = {
            stationId: data.int_id,
            referenceId: data.ref_id,
            name: data.name,
            location: {
                type: data.geometry.type,
                coordinates: data.geometry.coordinates
            },
            routes: data.routes
        };

        try {
            const createdStation = await StationModel.create(station);
        } catch (ex) {
            logger.error(`[${process.env.npm_package_name}] Creating a station produced an error: ${JSON.stringify(ex)}`);
        }
    }

    static async update() {

    }

    static async replace() {

    }

    static async remove() {

    }
}

module.exports = StationApi;