const restify = require('restify');

const logger = require('./services/logging');

const options = {
    name: 'lpp-parser',
    version: process.env.npm_package_version
};

const server = restify.createServer(options);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['X-App-Version'],
    exposeHeaders: []
});

server.pre(cors.preflight);

server.use(cors.actual);

require('./routes/init')(server);

server.listen(8080, () => {
    console.log(`${options.name} ${options.version} listening at ${server.url}`);

    logger.info(`${options.name} ${options.version} listening at ${server.url}`);

    const onDatabaseConnected = function () {
        logger.info(`[${process.env.npm_package_name}] Database connected`);

        const ParserApi = require('./api/parserApi');

        ParserApi.parseStations();
        ParserApi.parseBuses();
    };

    const onDatabaseError = function () {
        logger.info(`[${process.env.npm_package_name}] An error occurred while connecting to database`);

    };

    require('./services/database')(onDatabaseConnected, onDatabaseError);
});