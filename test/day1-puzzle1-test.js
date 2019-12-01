var assert = require('assert');
var calculateFuelForCraft = require('../src/day1-puzzle1');
var fs = require('fs');
var path = require('path');

describe('Test 1', function() {
  it('should return 2 when the mass is 12', () => {
    assert.equal(calculateFuelForCraft([12]), 2);
  });

  it('should return 2 when mass is 14', () => {
    assert.equal(calculateFuelForCraft([14]), 2);
  });

  it('should return 654 when mass is 1969', () => {
    assert.equal(calculateFuelForCraft([1969]), 654);
  });

  it('should return 100756 when mass is 33583', () => {
    assert.equal(calculateFuelForCraft([100756]), 33583);
  });

  it('should calculate from sample file', () => {
    const data = fs.readFileSync(
      path.join(__dirname, '..', 'input-files', 'day1-puzzle1.txt'),
      'utf-8'
    );
    const masses = data.split(", ");
    console.log(calculateFuelForCraft(masses));
  });
})