const restify = require('restify');

const etcd = require('./services/etcd');

const logger = require('./services/logging');

const options = {
    name: 'lpp-parser',
    version: process.env.npm_package_version
};

const server = restify.createServer(options);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
    res.json({
        name: 'lpp-parser',
        version: process.env.npm_package_version,
        description: 'Parses the data from the external API'
    });

    return next();
});

require('./routes/infoRoutes')(server);
require('./routes/healthRoutes')(server);
require('./routes/metricsRoutes')(server);
require('./routes/etcdRoutes')(server);

server.listen(8080, () => {
    console.log(`${options.name} ${options.version} listening at ${server.url}`);
    
    logger.info(`${options.name} ${options.version} listening at ${server.url}`);
});