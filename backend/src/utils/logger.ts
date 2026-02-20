import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(), // Adds color to log levels
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss", // Format of timestamp
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(), // For console logs
    }),
    new winston.transports.File({ filename: "logs/app.log" }), // For file logs
  ],
});

export default logger;