const assert = require("assert");
const {
  parser,
  isOptionDash,
  isInputOnlyOption,
  isInputOnlyValue,
  isInputOptionAndValue
} = require("../src/IO.js");

describe("parser", function() {
  describe("should return expected option, count, files", function() {
    it("there is no option or count and two files specified", function() {
      let expectedOutput = {
        option: "n",
        count: 10,
        files: ["ankon", "chandu"],
        context: "head"
      };
      let actualOutput = parser(['head.js','ankon','chandu']);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("when there is only count and two files are specified", function() {
      let expectedOutput = {
        option: "n",
        count: 5,
        files: ["ankon", "chandu"],
        context: "head"
      };
      let actualOutput = parser(["head.js", "-5", "ankon", "chandu"]);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("when both option and count and two files are specified together", function() {
      let expectedOutput = {
        option: "c",
        count: 3,
        files: ["ankon", "chandu"],
        context: "head"
      };
      let actualOutput = parser(["head.js", "-c3", "ankon", "chandu"]);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("when option and count are given separeately and two files are specified", function() {
      let expectedOutput = {
        option: "c",
        count: 3,
        files: ["ankon", "chandu"],
        context: "head"
      };
      let actualOutput = parser(["head.js", "-c", "3", "ankon", "chandu"]);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("when option -- and two files are specified", function() {
      let expectedOutput = {
        option: "n",
        count: 10,
        files: ["ankon", "chandu"],
        context: "head"
      };
      let actualOutput = parser(["head", "--", "ankon", "chandu"]);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("isOptionDash", function() {
  it("it Should return false if suplied argument is not --", function() {
    let actualOutput = isOptionDash('aa');
    assert.deepEqual(actualOutput, false);
  });

  it("it should return true if supplied argument is --", function() {
    let actualOutput = isOptionDash('--');
    assert.deepEqual(actualOutput, true);
  });
});

describe("isInputOnlyOption", function() {
  it("it should return false if argument is not only a option", function() {
    let actualOutput = isInputOnlyOption('-4');
    assert.deepEqual(actualOutput, false);
  });
  it("should return true if argument is only option n", function() {
    let actualOutput = isInputOnlyOption('-n');
    assert.deepEqual(actualOutput, true);
  });
  it("should return true if argument is only option t", function() {
    let actualOutput = isInputOnlyOption('-t');
    assert.deepEqual(actualOutput, true);
  });
});

describe("isInputOnlyValue", function() {
  it("should return false if the arguments are not only value", function() {
    let actualOutput = isInputOnlyValue('-e');
    assert.deepEqual(actualOutput, false);
  });

  it("should retun true if the arguments are only value", function() {
    let actualOutput = isInputOnlyValue('-4');
    assert.deepEqual(actualOutput, true);
  });
});

describe("isInputOptionAndValue", function() {
  it("should return false if arguments are only option", function() {
    let actualOutput = isInputOptionAndValue('-e');
    assert.deepEqual(actualOutput, false);
  });

  it("should return false if arguments are only value", function() {
    let actualOutput = isInputOptionAndValue('-4');
    assert.deepEqual(actualOutput, false);
  });

  it("should return true if arguments are both option and values", function() {
    let actualOutput = isInputOptionAndValue('-n4');
    assert.deepEqual(actualOutput, true);
  });
});
