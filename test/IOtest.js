const assert = require('assert');
const {
  setSliceIndex,
  partition,
  separateTypeValue
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

describe('partition',function(){
  it('should return typeValue in an array and an empty array for files if no files are supplied',function(){
    assert.deepEqual(partition(['-n',5]),{typeValue : '-n5', files : []});
  });

  it('should return an empty array in typeValue and filenames in an array if no type and value are specified',function(){
    assert.deepEqual(partition(['ankon','boy']),{typeValue : '', files : ['ankon','boy']});
  });

  it('should return typeValue in typeValue and filenames in filenames if both type and value are supplied',function(){
    assert.deepEqual(partition(['-n',5,'ankon','boy']),{typeValue : '-n5', files : ['ankon','boy']});
  });
});

describe('separateTypeValue',function(){
  it('should return type in type and value in value if there both values are given together',function(){
    let expectedOutput = {type: 'n', value : 5 , files:['ankon']};
    assert.deepEqual(separateTypeValue(['-n5','ankon']),expectedOutput);
  });

  it('should return type in type and value in value if there both values are given separate',function(){
    let expectedOutput = {type : 'n', value : 5, files: ['ankon']};
    assert.deepEqual(separateTypeValue(['-n',5,'ankon']),expectedOutput);
  });

  it('should return empty array in type and value in value if there only value is supplied',function(){
    let expectedOutput = {type : '' , value : 5, files: ['ankon']};
    assert.deepEqual(separateTypeValue(['-5','ankon']),expectedOutput);
  });

  it('should return empty array in type and 0 in value if neither type nor value is specified',function(){
    let expectedOutput = {type: '', value: '', files: ['ankon']};
    assert.deepEqual(separateTypeValue(['ankon']),expectedOutput);
  });
});

