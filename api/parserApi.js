const axios = require('axios');

const logger = require('../services/logging');

const StationApi = require('./station/stationApi');
const BusApi = require('./bus/busApi');

const URL = 'http://data.lpp.si';

class ParserApi {
    static async parseStations() {
        const url = `${URL}/stations/getAllStations`;

        logger.info(`[${process.env.npm_package_name}] Station parsing started`);

        try {
            const request = await axios.get(url);

            const data = request.data;

            if (data.success) {
                for (const station of data.data) {
                    station.routes = await ParserApi.getRoutesOnStation(station.int_id);

                    await StationApi.create(station);
                }

                logger.info(`[${process.env.npm_package_name}] Station parsing successfully finished`);
            } else {
                logger.error(`[${process.env.npm_package_name}] The external API for stations ${url} returned an error`);
            }
        } catch (ex) {
            logger.error(`[${process.env.npm_package_name}] Station parsing encountered an error: ${JSON.stringify(ex)}`);
        }
    }

    static async getRoutesOnStation(stationId) {
        const url = `${URL}stations/getRoutesOnStation?station_int_id=${stationId}`;

        try {
            const request = await axios.get(url);

            const data = request.data;

            if (data.success) {
                return data.data.map((busNumber) => ({ busNumber }));
            } else {
                logger.error(`[${process.env.npm_package_name}] The external API for getting station routes ${url} returned an error`);
            }
        } catch (ex) {
            logger.error(`[${process.env.npm_package_name}] Station routes fetching encountered an error: ${JSON.stringify(ex)}`);
        }

        return null;
    }

    static async parseBuses() {
        const url = `${URL}/routes/getRoutes`;

        logger.info(`[${process.env.npm_package_name}] Bus routes parsing started`);

        try {
            const request = await axios.get(url);

            const data = request.data;

            if (data.success) {
                for (const bus of data.data) {
                    await BusApi.create(bus);
                }

                logger.info(`[${process.env.npm_package_name}] Bus routes parsing successfully finished`);
            } else {
                logger.info(`[${process.env.npm_package_name}] The external API for buses ${url} returned an error`);
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}

module.exports = ParserApi;