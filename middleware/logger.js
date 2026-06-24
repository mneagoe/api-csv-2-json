const pino = require('pino');

const transport = pino.transport({
    target: 'pino/file',
    options: { destination: 1 }
});

const instance = pino(transport);

const logger = (req, res, next) => {
    instance.info({
        method: req.method,
        url: req.originalUrl,
        host: req.get('host'),
        protocol: req.protocol,
    }, 'request');
    next();
}

logger.info = instance.info.bind(instance);
logger.error = instance.error.bind(instance);
logger.warn = instance.warn.bind(instance);

module.exports = logger;