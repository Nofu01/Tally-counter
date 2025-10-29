/**
 * @fileoverview Unit tests for counter module
 */

const { expect } = require('chai');
const counter = require('../src/counter');

describe('Counter Module', () => {
  
  beforeEach(() => {
    // Reset counter before each test
    counter.reset();
  });

  describe('read()', () => {
    it('should return initial value of 0', () => {
      const result = counter.read();
      expect(result).to.equal(0);
    });

    it('should return current count value', () => {
      counter.increase();
      counter.increase();
      const result = counter.read();
      expect(result).to.equal(2);
    });
  });

  describe('increase()', () => {
    it('should increment counter by 1', () => {
      const result = counter.increase();
      expect(result).to.equal(1);
    });

    it('should increment multiple times correctly', () => {
      counter.increase();
      counter.increase();
      const result = counter.increase();
      expect(result).to.equal(3);
    });

    it('should return new value after increment', () => {
      const result = counter.increase();
      expect(result).to.equal(counter.read());
    });
  });

  describe('reset()', () => {
    it('should reset counter to 0', () => {
      counter.increase();
      counter.increase();
      const result = counter.reset();
      expect(result).to.equal(0);
    });

    it('should return 0 after reset', () => {
      counter.increase();
      counter.reset();
      expect(counter.read()).to.equal(0);
    });

    it('should work when counter is already 0', () => {
      const result = counter.reset();
      expect(result).to.equal(0);
    });
  });

  describe('Integration', () => {
    it('should handle increase -> read -> reset sequence', () => {
      counter.increase();
      expect(counter.read()).to.equal(1);
      counter.increase();
      expect(counter.read()).to.equal(2);
      counter.reset();
      expect(counter.read()).to.equal(0);
    });

    it('should maintain state across operations', () => {
      for (let i = 0; i < 10; i++) {
        counter.increase();
      }
      expect(counter.read()).to.equal(10);
    });
  });
});