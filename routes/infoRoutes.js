const logger = require('../services/logging');

const initRoutes = function (server) {
    server.get('/info', function (req, res, next) {
        logger.info('Accessed info route');

        res.json({
            "clani": ["np9417", "lb4263"],
            "opis_projekta": "Projekt je namenjen iskanju poti preko LPP-ja",
            "mikrostoritve": [
                "https://lpp-parser.azurewebsites.net",
                "https://lpp-logger.azurewebsites.net",
                "https://lpp-route-finder.azurewebsites.net",
                "https://lpp-payment.azurewebsites.net",
                "https://lpp-parser.azurewebsites.net",
                "https://lpp-account.azurewebsites.net",
                "https://lpp-frontend.azurewebsites.net"
            ],
            "github": [
                "https://github.com/BezPov/lpp-parser",
                "https://github.com/BezPov/rso-lpp-logger",
                "https://github.com/BezPov/rso-lpp-route-finder",
                "https://github.com/BezPov/rso-lpp-payment",
                "https://github.com/BezPov/rso-lpp-parser",
                "https://github.com/BezPov/rso-lpp-account",
                "https://github.com/BezPov/rso-lpp-frontend"
            ],
            "travis": [
                "https://travis-ci.org/BezPov/rso-lpp-feedback",
                "https://travis-ci.org/BezPov/rso-lpp-logger",
                "https://travis-ci.org/BezPov/lpp-parser",
                "https://travis-ci.org/BezPov/rso-lpp-account",
                "https://travis-ci.org/BezPov/rso-lpp-frontend",
                "https://travis-ci.org/BezPov/rso-lpp-route-finder",
                "https://travis-ci.org/BezPov/rso-lpp-payment",
                "https://travis-ci.org/BezPov/rso-lpp-parser"
            ],
            "dockerhub": [
                "https://hub.docker.com/repository/docker/bezpov/logger",
                "https://hub.docker.com/repository/docker/bezpov/lpp-parser",
                "https://hub.docker.com/repository/docker/bezpov/lpp-account",
                "https://hub.docker.com/repository/docker/bezpov/lpp-frontend",
                "https://hub.docker.com/repository/docker/bezpov/lpp-route-finder",
                "https://hub.docker.com/repository/docker/bezpov/lpp-payment",
                "https://hub.docker.com/repository/docker/bezpov/lpp-parser",
                "https://hub.docker.com/repository/docker/bezpov/lpp-feedback"
            ]
        });

        return next();
    });
};

module.exports = initRoutes;