const assert = require("assert");
const { parser } = require("../src/head_IO.js");

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
