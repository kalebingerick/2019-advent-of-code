var run = require('../src/day4-puzzle2');
var assert = require('assert');

describe.only('day4-puzzle2', () => {
  // it('1', () => {
  //   assert.equal(run('112233'), true);
  // });
  // it('1', () => {
  //   assert.equal(run('123444'), false);
  // });
  // it('1', () => {
  //   assert.equal(run('111122'), true)
  // });

  it('1', () => {
    assert.equal(run(666577, 666578), 1)
  })

  it('for real', () => {
    console.log(run(178416, 676461));
  })
});