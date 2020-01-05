const ArrivalsApi = require('../api/../api/arrivals/arrivalsApi');

const initRoutes = function (server) {
    server.get('/arrivals/:stationId/daily', async function (req, res, next) {
        if (!req.params.stationId) {
            res.status(400).json({ success: false, error: 'required._id' });

            return next();
        }

        res.json({
            success: true,
            data: await ArrivalsApi.getDailyArrivalsForStation(req.params.stationId)
        });

        return next();
    });
    server.get('/arrivals/:stationId/live', async function (req, res, next) {
        if (!req.params.stationId) {
            res.status(400).json({ success: false, error: 'required._id' });

            return next();
        }

        const arrivals = await ArrivalsApi.getLiveArrivals(req.params.stationId);

        res.json({
            success: true,
            data: arrivals
        });

        return next();
    });
};

module.exports = initRoutes;