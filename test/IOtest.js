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
      assert.deepEqual(parser(["head.js", "ankon", "chandu"]), expectedOutput);
    });
    it("when there is only count and two files are specified", function() {
      let expectedOutput = {
        option: "n",
        count: 5,
        files: ["ankon", "chandu"],
        context: "head"
      };
      assert.deepEqual(
        parser(["head.js", "-5", "ankon", "chandu"]),
        expectedOutput
      );
    });
    it("when both option and count and two files are specified together", function() {
      let expectedOutput = {
        option: "c",
        count: 3,
        files: ["ankon", "chandu"],
        context: "head"
      };
      assert.deepEqual(
        parser(["head.js", "-c3", "ankon", "chandu"]),
        expectedOutput
      );
    });
    it("when option and count are given separeately and two files are specified", function() {
      let expectedOutput = {
        option: "c",
        count: 3,
        files: ["ankon", "chandu"],
        context: "head"
      };
      assert.deepEqual(
        parser(["head.js", "-c", "3", "ankon", "chandu"]),
        expectedOutput
      );
    });
    it("when option -- and two files are specified", function() {
      let expectedOutput = {
        option: "n",
        count: 10,
        files: ["ankon", "chandu"],
        context: "head"
      };
      assert.deepEqual(
        parser(["head", "--", "ankon", "chandu"]),
        expectedOutput
      );
    });
  });
});

describe("isOptionDash", function() {
  it("it Should return false if suplied argument is not --", function() {
    assert.deepEqual(isOptionDash("aa"), false);
  });

  it("it should return true if supplied argument is --", function() {
    assert.deepEqual(isOptionDash("--"), true);
  });
});

describe("isInputOnlyOption", function() {
  it("it should return false if argument is not only a option", function() {
    assert.deepEqual(isInputOnlyOption("-4"), false);
  });
  it("should return true if argument is only option n", function() {
    assert.deepEqual(isInputOnlyOption("-n"), true);
  });
  it("should return false if argument is only option w", function() {
    assert.deepEqual(isInputOnlyOption("-t"), true);
  });
});

describe("isInputOnlyValue", function() {
  it("should return false if the arguments are not only value", function() {
    assert.deepEqual(isInputOnlyValue("-e"), false);
  });

  it("should retun true if the arguments are only value", function() {
    assert.deepEqual(isInputOnlyValue("-4"), true);
  });
});

describe("isInputOptionAndValue", function() {
  it("should return false if arguments are only option", function() {
    assert.deepEqual(isInputOptionAndValue("-e"), false);
  });

  it("should return false if arguments are only numbers", function() {
    assert.deepEqual(isInputOptionAndValue("-4"), false);
  });

  it("should return true if arguments are both option and values", function() {
    assert.deepEqual(isInputOptionAndValue("-n4"), true);
  });
});
