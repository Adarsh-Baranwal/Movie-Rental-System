const { transport } = require('winston');
const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
 winston.createLogger({
    exitOnError:false,
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    exceptionHandlers:[new winston.transports.Console({ colorize: true, prettyPrint: true}),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  ],
  transports:[new winston.transports.File ({ filename: 'logfile.log' })]
}
    )

  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
}