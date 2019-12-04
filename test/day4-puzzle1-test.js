var run = require('../src/day4-puzzle1');
var assert = require('assert');

describe('day4-puzzle1', () => {
  it.skip('1', () => {
    assert.equal(run('111111'), true);
    assert.equal(run('223450'), false);
    assert.equal(run('123789'), false)
  });

  it.only('for real', () => {
    console.log(run(178416, 676461));
  })
});