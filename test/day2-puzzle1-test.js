var evaluateOpcode = require('../src/day2-puzzle1');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('day2-puzzle1', () => {

  it('should evaluate opcode1', () => {
    assert.equal(evaluateOpcode([1,0,0,0,99]), [2,0,0,0,99]);
  });

  it('should evaluate opcode2', () => {
    assert.equal(evaluateOpcode([2,3,0,3,99]), [2,3,0,6,99]);
  });
  
  it('should evaluate opcode3', () => {
    assert.equal(evaluateOpcode([2,4,4,5,99,0]), [2,4,4,5,99,9801]);
  });

  it('should evaluate opcode4', () => {
    assert.equal(evaluateOpcode([1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99]);
  });

  it('should evaluate opcode5', () => {
    assert.deepEqual(evaluateOpcode([1,9,10,3,2,3,11,0,99,30,40,50]), [3500,9,10,70, 2,3,11,0, 99, 30,40,50]);
  })

  it('should calculate from sample file', () => {
    const data = fs.readFileSync(
      path.join(__dirname, '..', 'input-files', 'day2-puzzle1.txt'),
      'utf-8'
    );
    const opcode = data.split(",").map(Number);
    console.log(evaluateOpcode(opcode)[0]);
  });
});