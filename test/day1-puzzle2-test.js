var assert = require('assert');
var calculateFuelForCraft = require('../src/day1-puzzle2');
var fs = require('fs');
var path = require('path');

describe('Test 2', function() {
  it('should calculate fuel for 12', () => {
    assert.equal(calculateFuelForCraft([12]), 2);
  });

  it('should calculate fuel for 14', () => {
    assert.equal(calculateFuelForCraft([14]), 2);
  });

  it('should calculate fuel for 1969', () => {
    assert.equal(calculateFuelForCraft([1969]), 966);
  });

  it('should calculate fuel for 100756', () => {
    assert.equal(calculateFuelForCraft([100756]), 50346);
  });
})