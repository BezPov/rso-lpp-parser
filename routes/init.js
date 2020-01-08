module.exports = function (server) {
    server.get('/', (req, res, next) => {
        res.json({
            name: 'lpp-parser',
            version: process.env.npm_package_version,
            description: 'Api gateway'
        });

        return next();
    });

    require('./infoRoutes')(server);
    require('./healthRoutes')(server);
    require('./metricsRoutes')(server);
    require('./etcdRoutes')(server);
};