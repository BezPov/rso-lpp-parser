const restify = require('restify');

const logger = require('./services/logging');

const etcd = require('./services/etcd');

let CronJob = require('cron').CronJob;

const options = {
    name: 'lpp-parser',
    version: process.env.npm_package_version
};

const server = restify.createServer(options);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const setupCors = function (server) {
    const corsMiddleware = require('restify-cors-middleware');

    const cors = corsMiddleware({
        preflightMaxAge: 5,
        origins: ['*'],
        allowHeaders: ['X-App-Version'],
        exposeHeaders: []
    });

    server.pre(cors.preflight);

    server.use(cors.actual);
};

setupCors(server);

require('./routes/init')(server);

server.listen(8082, () => {
    console.log(`${options.name} ${options.version} listening at ${server.url}`);

    logger.info(`${options.name} ${options.version} listening at ${server.url}`);

    const onDatabaseConnected = function () {
        logger.info(`[${process.env.npm_package_name}] Database connected`);

        const watcher = etcd.watcher("parser_schedule");

        watcher.on("change", (res) => {
            runParserJob(res.node.value, false);
        }); // Triggers on all changes

        etcd.get("parser_schedule", (err, res) => {
            if (err) {
                console.log(err);
                return;
            }

            runParserJob(res.node.value, true);
        });
    };

    const onDatabaseError = function () {
        logger.info(`[${process.env.npm_package_name}] An error occurred while connecting to database`);
    };

    const runParserJob = function (schedule, runOnInit) {
        const ParserApi = require('./api/parserApi');

        new CronJob(schedule, function () {
            logger.info(`[${process.env.npm_package_name}] Parsing jobs started`);
            ParserApi.parseStations();
            ParserApi.parseBuses();
        }, null, true, null, null, runOnInit);
    };

    require('./services/database')(onDatabaseConnected, onDatabaseError);
});