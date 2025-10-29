/**
 * @fileoverview Counter module for managing tally count state
 * @module counter
 * @requires ./logger
 */

const logger = require('./logger');

/**
 * Current counter value
 * @type {number}
 * @private
 */
let count = 0;

/**
 * Reads and returns the current counter value
 * @function read
 * @returns {number} Current count value
 * @example
 * const currentCount = counter.read();
 * console.log(currentCount); // 0
 */
function read() {
  logger.info(`[COUNTER] read ${count}`);
  return count;
}

/**
 * Increases the counter by one and returns the new value
 * @function increase
 * @returns {number} New count value after increment
 * @example
 * const newCount = counter.increase();
 * console.log(newCount); // 1
 */
function increase() {
  count++;
  logger.info(`[COUNTER] increase ${count}`);
  return count;
}

/**
 * Resets the counter to zero and returns the reset value
 * @function reset
 * @returns {number} Counter value after reset (always 0)
 * @example
 * const resetCount = counter.reset();
 * console.log(resetCount); // 0
 */
function reset() {
  count = 0;
  logger.info(`[COUNTER] zeroed ${count}`);
  return count;
}

module.exports = {
  read,
  increase,
  reset
};