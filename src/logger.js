/**
 * @fileoverview Winston logger configuration for the Tally Counter API
 * @module logger
 * @requires winston
 * @requires path
 * @requires fs
 * @author Nformi Kingsly Nofu
 * @copyright 2024 Nformi Kingsly Nofu
 * @license MIT
 */

const { createLogger, transports, format } = require('winston');
const path = require('path');
const fs = require('fs');

/**
 * Logs directory path
 * @type {string}
 * @constant
 */
const logsDir = path.join(__dirname, '../logs');

/**
 * Creates logs directory if it doesn't exist
 * @function ensureLogsDirectory
 * @returns {void}
 */
function ensureLogsDirectory() {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

ensureLogsDirectory();

/**
 * Custom console format with colors and timestamps
 * @type {import('winston').Logform.Format}
 * @constant
 */
const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

/**
 * JSON format for file outputs
 * @type {import('winston').Logform.Format}
 * @constant
 */
const fileFormat = format.combine(
  format.timestamp(),
  format.json()
);

/**
 * Winston logger instance
 * @type {import('winston').Logger}
 * @constant
 * @description
 * Configured logger with console and file transports
 * Log levels: error, warn, info
 */
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new transports.Console({
      format: consoleFormat
    }),
    new transports.File({ 
      filename: path.join(logsDir, 'error.log'), 
      level: 'error',
      format: fileFormat
    }),
    new transports.File({ 
      filename: path.join(logsDir, 'combined.log'),
      format: fileFormat
    })
  ]
});

module.exports = logger;