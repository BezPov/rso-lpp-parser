const axios = require('axios');
const logger = require('../services/logging');

const serviceUrl = 'http://lpp-buses-service:92';

class BusRequestHandler {
    static async create(postData) {
        const url = `${serviceUrl}`;

        try {
            const request = await axios.post(url, postData);

            const data = request.data;

            if (data.success) {
                return data.data;
            } else {
                logger.error(`[${process.env.npm_package_name}] The bus service request handler returned an error for create`);
            }
        } catch (ex) {
            logger.error(`[${process.env.npm_package_name}] The bus service request handler encountered an error for create: ${JSON.stringify(ex)}`);
        }

        return null;

    }
}

module.exports = BusRequestHandler;