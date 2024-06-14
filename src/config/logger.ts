import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  levels:{
    'debug':2,
    'error':0,
    'info':2,
    'warn':1,
    },  
    format: format.combine(
    format.colorize({
      all: true,
      colors: { info: 'yellow', error: 'red', warn: 'magentaBG', debug: 'cyanBG' },
    }),
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
