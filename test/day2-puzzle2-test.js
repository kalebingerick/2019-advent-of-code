var evaluateOpcodes = require('../src/day2-puzzle2');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('day2-puzzle2', () => {
  it('should calculate from sample file', () => {
    const data = fs.readFileSync(
      path.join(__dirname, '..', 'input-files', 'day2-puzzle1.txt'),
      'utf-8'
    );
    const opcode = data.split(",").map(Number);
    console.log(evaluateOpcodes(opcode, 19690720));
  });
});