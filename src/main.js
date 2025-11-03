/**
 * @fileoverview Main application file - Express server setup
 * @author Nformi Kingsly Nofu
 * @copyright 2024 Nformi Kingsly Nofu
 * @license MIT
 * @module main
 * @requires express
 * @requires ./routes
 * @requires ./logger
 */

const express = require('express');
const routes = require('./routes');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Express middleware setup
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Mount routes
 */
app.use('/', routes);

/**
 * Starts the Express server
 * @function startServer
 * @returns {import('http').Server} HTTP server instance
 */
function startServer() {
  const server = app.listen(PORT, () => {
    logger.info(`[MAIN] Starting`);
    logger.info(`[MAIN] Server running on http://localhost:${PORT}`);
  });

  /**
   * Graceful shutdown handler
   */
  process.on('SIGTERM', () => {
    logger.info('[MAIN] Stopping');
    server.close(() => {
      logger.info('[MAIN] Server stopped');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    logger.info('[MAIN] Stopping');
    server.close(() => {
      logger.info('[MAIN] Server stopped');
      process.exit(0);
    });
  });

  return server;
}

// Start server only if not in test mode
if (require.main === module) {
  startServer();
}

module.exports = app;