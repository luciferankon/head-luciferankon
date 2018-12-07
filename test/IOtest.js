const assert = require("assert");
const { 
  parser,
  isTypeDash,
  isInputOnlyType,
  isInputOnlyValue,
  isInputTypeAndValue
} = require("../src/head_IO.js");

describe("parser", function() {
  it("should return type n, range 10 and given input in files if there is no type or range specified", function() {
    let expectedOutput = { type: "n", range: 10, files: ["ankon", "chandu"] };
    assert.deepEqual(parser(["ankon", "chandu"]), expectedOutput);
  });
  it("should return type n, given range in range, files in files if there is only range is specified", function() {
    let expectedOutput = { type: "n", range: 5, files: ["ankon", "chandu"] };
    assert.deepEqual(parser(["-5", "ankon", "chandu"]), expectedOutput);
  });
  it("should return type in type, range in range, files in files if both type and range are specified together", function() {
    let expectedOutput = { type: "c", range: 3, files: ["ankon", "chandu"] };
    assert.deepEqual(parser(["-c3", "ankon", "chandu"]), expectedOutput);
  });
  it("should return type in type, range in range, files in files if type and range are given separeately", function() {
    let expectedOutput = { type: "c", range: 3, files: ["ankon", "chandu"] };
    assert.deepEqual(parser(["-c", "3", "ankon", "chandu"]), expectedOutput);
  });

  it("should return n in type, 10 in range. files in files if -- is supplied", function() {
    let expectedOutput = { type: "n", range: 10, files: ["ankon", "chandu"] };
    assert.deepEqual(parser(["--", "ankon", "chandu"]), expectedOutput);
  });
});

describe('isTypeDash',function(){
  it('it Should return false if suplied argument is not --',function(){
    assert.deepEqual(isTypeDash('aa'),false);
  });
  
  it('it should return true if supplied argument is --',function(){
    assert.deepEqual(isTypeDash('--'),true);
  });
});

describe('isInputOnlyType',function(){
  it('it should return false if argument is not only a type',function(){
    assert.deepEqual(isInputOnlyType('-4'),false);
  });
  it('should return true if argument is only type n',function(){
    assert.deepEqual(isInputOnlyType('-n'),true);
  });
  it('should return false if argument is only type w',function(){
    assert.deepEqual(isInputOnlyType('-t'),true);
  });
});

describe('isInputOnlyValue',function(){
  it('should return false if the arguments are not only value',function(){
    assert.deepEqual(isInputOnlyValue('-e'),false);
  });

  it('should retun true if the arguments are only value',function(){
    assert.deepEqual(isInputOnlyValue('-4'),true);
  });
});

describe('isInputTypeAndValue',function(){
  it('should return false if arguments are only type',function(){
    assert.deepEqual(isInputTypeAndValue('-e'),false);
  });

  it('should return false if arguments are only numbers',function(){
    assert.deepEqual(isInputTypeAndValue('-4'),false);
  });

  it('should return true if arguments are both type and values',function(){
    assert.deepEqual(isInputTypeAndValue('-n4'),true);
  });
});
