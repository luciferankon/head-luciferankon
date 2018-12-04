const assert = require('assert');
const {
  setSliceIndex
} = require('../src/head_IO.js');

describe('setSliceIndex',function(){
  describe('for one file only',function(){
    it('should return 1 if there is only one element defining type and number',function(){
      assert.deepEqual(setSliceIndex(['-n5','ankon']),1);
    });

    it('should return 0 if there is no type specifier',function(){
      assert.deepEqual(setSliceIndex(['ankon']),0);
    });

    it('should return 2 if there is two element specifying type and number',function(){
      assert.deepEqual(setSliceIndex(['-n',5,'ankon']),2);
    });
  });
  
  describe('for multiple inputs',function(){
    it('should return 1 if there is only one element defining type and number',function(){
      assert.deepEqual(setSliceIndex(['-n5','ankon','boy']),1);
    });

    it('should return 0 if there is no type specifier',function(){
      assert.deepEqual(setSliceIndex(['ankon','boy']),0);
    });

    it('should return 2 if there is two element specifying type and number',function(){
      assert.deepEqual(setSliceIndex(['-n',5,'ankon','boy']),2);
    });
  });
});
