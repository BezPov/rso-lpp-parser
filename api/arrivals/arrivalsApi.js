const axios = require('axios');

const logger = require('../../services/logging');

class ArrivalsApi {
    static async getDailyArrivalsForStation(stationId) {
        const url = `http://data.lpp.si/timetables/getArrivalsOnStation?station_int_id=${stationId}`;

        try {
            const request = await axios.get(url);

            const data = request.data;

            if (data.success) {
                return data.data;
            } else {
                logger.error(`[${process.env.npm_package_name}] The external API for getting daily arrivals ${url} returned an error`);
            }
        } catch (ex) {
            logger.error(`[${process.env.npm_package_name}] Station daily arrivals fetching encountered an error: ${JSON.stringify(ex)}`);
        }

        return [];
    }

    static async getLiveArrivals(stationId) {
        const url = `http://data.lpp.si/timetables/liveBusArrival?station_int_id=${stationId}`;

        try {
            const request = await axios.get(url);

            const data = request.data;

            if (data.success) {
                return data.data.map((arrival) => {
                    return {
                        timeOfCheck: arrival.utc_timestamp,
                        validity: arrival.validity,
                        estimatedTimeOfArrival: arrival.eta,
                        busNumber: arrival.route_number,
                        busName: `${arrival.route_number}${arrival.route_name}`
                    };
                });
            } else {
                logger.error(`[${process.env.npm_package_name}] The external API for getting live arrivals ${url} returned an error`);
            }
        } catch (ex) {
            logger.error(`[${process.env.npm_package_name}] Station live arrivals fetching encountered an error: ${JSON.stringify(ex)}`);
        }

        return [];
    }
}

module.exports = ArrivalsApi;