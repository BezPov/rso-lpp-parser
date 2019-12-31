const initRoutes = function (server) {
    server.get('/health', function (req, res, next) {
        res.json({
            status: 'OK'
        });

        return next();
    });
};

module.exports = initRoutes;