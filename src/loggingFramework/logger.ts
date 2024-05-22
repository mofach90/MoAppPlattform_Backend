import { createLogger, format, transports } from "winston";

const hi = true;

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize({
      all: true,
      colors: { info: "yellow", error: "red", warn: "magentaBG" },
    }),
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
      }`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
