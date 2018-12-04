const assert = require('assert');
const { apply } = require('../src/lib.js');
const add = function(first,second){
  return first+ second;
}

describe('apply function',function(){
  it('should return the output of the function with the arguments',function(){
    assert.deepEqual(apply(add,2,3),5);
  });
});
