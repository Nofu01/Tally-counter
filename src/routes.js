/**
 * @fileoverview Express routes for the Tally Counter API
 * @author Nformi Kingsly Nofu
 * @copyright 2024 Nformi Kingsly Nofu
 * @license MIT
 * @module routes
 * @requires express
 * @requires ./counter
 * @requires ./logger
 */

const express = require('express');
const counter = require('./counter');
const logger = require('./logger');
const router = express.Router();

/**
 * Root endpoint - API information
 * @name GET /
 * @function
 * @memberof module:routes
 * @returns {Object} API information
 */
router.get('/', (req, res) => {
  logger.info("[ENDPOINT] GET '/'");
  res.json({
    name: 'Tally Counter API',
    version: '1.0.0',
    endpoints: {
      'GET /': 'API information',
      'GET /counter-read': 'Read current counter value',
      'GET /counter-increase': 'Increase counter by one',
      'GET /counter-reset': 'Reset counter to zero'
    }
  });
});

/**
 * Read counter endpoint
 * @name GET /counter-read
 * @function
 * @memberof module:routes
 * @returns {Object} Current counter value
 * @example
 * // Response
 * { "count": 5 }
 */
router.get('/counter-read', (req, res) => {
  logger.info("[ENDPOINT] GET '/counter-read'");
  const currentCount = counter.read();
  res.json({ count: currentCount });
});

/**
 * Increase counter endpoint
 * @name GET /counter-increase
 * @function
 * @memberof module:routes
 * @returns {Object} New counter value after increment
 * @example
 * // Response
 * { "count": 6 }
 */
router.get('/counter-increase', (req, res) => {
  logger.info("[ENDPOINT] GET '/counter-increase'");
  const newCount = counter.increase();
  res.json({ count: newCount });
});

/**
 * Reset counter endpoint
 * @name GET /counter-reset
 * @function
 * @memberof module:routes
 * @returns {Object} Counter value after reset (always 0)
 * @example
 * // Response
 * { "count": 0 }
 */
router.get('/counter-reset', (req, res) => {
  logger.info("[ENDPOINT] GET '/counter-reset'");
  const resetCount = counter.reset();
  res.json({ count: resetCount });
});

module.exports = router;