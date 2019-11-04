const restify = require('restify');

const server = restify.createServer({
    name: 'lpp-parser',
    version: '1.0.0'
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
    res.json({
        name: 'lpp-parser',
        version: '1.0.0',
        description: 'Parse LPP site'
    });

    return next();
});

server.listen(8080, () => {
    console.log(`${server.name} listening at ${server.url}`);
});