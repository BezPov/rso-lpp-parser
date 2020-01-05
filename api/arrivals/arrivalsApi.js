const axios = require('axios');

const logger = require('../../services/logging');

const StationApi = require('../station/stationApi');

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

    /**
     * Using data.lpp.api, which does not have all the information, but works for some stations
     * @param stationId
     * @returns {Promise<Array|Uint8Array|BigInt64Array|{timeOfCheck: *, busName: string, validity: *, estimatedTimeOfArrival: *, busNumber: *}[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array>}
     */
    static async getLiveArrivalsOld(stationId) {
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

    static async getLiveArrivals(stationId) {
        const station = await StationApi.findOne({ stationId });

        if (!station || !station.referenceId) {
            return null;
        }

        const url = `https://www.lpp.si/lpp/ajax/1/${station.referenceId}`;

        try {
            const request = await axios.get(url);

            const data = request.data;

            if (data && data.length) {
                return data.map((arrivals) => {
                    return arrivals.reduce((accumulator, currentValue) => {
                        accumulator.busNumber = currentValue.key;
                        accumulator.busName = currentValue.name;

                        accumulator.arrivals.push({
                            minutes: currentValue.minutes,
                            time: currentValue.time
                        });

                        return accumulator;
                    }, { arrivals: [] });
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