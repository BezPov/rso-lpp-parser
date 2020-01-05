const StationApi = require('../api/station/stationApi');

const initRoutes = function (server) {
    server.get('/stations', async function (req, res, next) {
        const selector = {};

        const options = {
            skip: 0,
            limit: 20
        };

        if (req.query) {
            if (req.query.q) {
                selector.name = {
                    '$regex': req.query.q,
                    '$options' : 'i'
                }
            }

            if (req.query.skip) options.skip = parseInt(req.query.skip);

            if (req.query.limit) options.limit = parseInt(req.query.limit);
        }

        const fetchedStations = await StationApi.findMany(selector, options);

        res.json({
            success: true,
            skip: options.skip,
            limit: options.limit,
            data: fetchedStations
        });

        return next();
    });

    server.get('/stations/:stationId', async function (req, res, next) {
        const fetchedStation = await StationApi.findOne({ stationId: req.params.stationId });

        res.json({
            success: true,
            data: fetchedStation
        });

        return next();
    });
};

module.exports = initRoutes;