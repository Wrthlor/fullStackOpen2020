const logger = require('./loggers');

// Command line logger
const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method);
    logger.info('Path:   ', req.path);
    logger.info('Body:   ', req.body);
    logger.info('---');
    next();
}

// Sends status code 404 when unkonwn URL endpoint
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' });
}

// Handles HTTP status codes and error messages
const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'Malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' });
    }

    next(error);
}

// Gets token from "authorization" header
// Place on token field of request object
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    }
    else {
        req.token = null;
    }

    next();
    return req.token;
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
}