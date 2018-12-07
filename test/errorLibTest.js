const assert = require('assert');
const { 
  errorCheck,
  isTypeError,
  isValueError,
  isFileError
} = require('../src/errorLib.js');

describe('errorCheck', function() {
  describe('type error', function() {
    it('should return specified error if type is a character and file is given', function() {
      let expectedOutput =
        'head: illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]';
      assert.deepEqual(errorCheck('x', 10, ['ankon']), expectedOutput);
    });

    it('should return specified error if type is a character and file is not given', function() {
      let expectedOutput =
        'head: illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]';
      assert.deepEqual(errorCheck('x', 10, []), expectedOutput);
    });
  });

  describe('value error for type n', function() {
    it('should return specified error if value is a string', function() {
      let expectedOutput = 'head: illegal line count -- dx';
      assert.deepEqual(errorCheck('n', 'dx', ['ankon']), expectedOutput);
    });

    it('should return specified error if value is 0', function() {
      let expectedOutput = 'head: illegal line count -- 0';
      assert.deepEqual(errorCheck('n', '0', ['ankon']), expectedOutput);
    });

    it('should return specified error if value is negative number', function() {
      let expectedOutput = 'head: illegal line count -- -1';
      assert.deepEqual(errorCheck('n', '-1', ['ankon']), expectedOutput);
    });
  });

  describe('value error for type c', function() {
    it('should return specified error if value is a string', function() {
      let expectedOutput = 'head: illegal byte count -- dx';
      assert.deepEqual(errorCheck('c', 'dx', ['ankon']), expectedOutput);
    });

    it('should return specified error if value is 0', function() {
      let expectedOutput = 'head: illegal byte count -- 0';
      assert.deepEqual(errorCheck('c', '0', ['ankon']), expectedOutput);
    });

    it('should return specified error if value is negative number', function() {
      let expectedOutput = 'head: illegal byte count -- -1';
      assert.deepEqual(errorCheck('c', '-1', ['ankon']), expectedOutput);
    });
  });

  describe('file error', function() {
    it('should return specified error if type and value both are valid and no files given', function() {
      let expectedOutput =
        'head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]';
      assert.deepEqual(errorCheck('c', '1', []), expectedOutput);
    });
  });

  describe('no error', function() {
    it('should return undefined if no error is there', function() {
      assert.deepEqual(errorCheck('n', '10', ['ankon']), undefined);
    });
  });

  describe('isTypeInvalid',function(){
    it('should return true if type is neither n nor c',function(){
      assert.deepEqual(isTypeError('a'),true);
    });

    it('should return false if type is n',function(){
      assert.deepEqual(isTypeError('n'),false);
    });

    it('should return false if type is c',function(){
      assert.deepEqual(isTypeError('c'),false);
    });
  });
  describe('isValueInvalid',function(){
    it('should return true if value is negative',function(){
      assert.deepEqual(isValueError('-1'),true);
    });

    it('should return true if value is 0',function(){
      assert.deepEqual(isValueError('0'),true);
    });

    it('should return true if value is string',function(){
      assert.deepEqual(isValueError('ax'),true);
    });
  });
});
