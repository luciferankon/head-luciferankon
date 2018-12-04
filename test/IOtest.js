const assert = require('assert');
const {
  setSliceIndex
} = require('../src/head_IO.js');

describe('setSliceIndex',function(){
  it('should return 1 if there is only one element defining type and number',function(){
    assert.deepEqual(setSliceIndex(['-n5','ankon']),1);
  });
});
