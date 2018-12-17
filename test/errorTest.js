const assert = require("assert");
const {
  checkErrorOfHead,
  checkErrorOfTail,
  isOptionError,
  isValueError,
  isFileError
} = require("../src/error.js");

describe("checkErrorOfHead", function() {
  describe("option error", function() {
    it("should return specified error if option is a character and file is given", function() {
      let expectedOutput =
        "head: illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]";
      let actualOutput = checkErrorOfHead('x', 10, ['ankon']);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return specified error if option is a character and file is not given", function() {
      let expectedOutput =
        "head: illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]";
      let actualOutput = checkErrorOfHead('x', 10, []);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("value error for option n", function() {
    it("should return specified error if value is a string", function() {
      let expectedOutput = "head: illegal line count -- dx";
      let actualOutput = checkErrorOfHead('n', 'dx', ['ankon']);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return specified error if value is 0", function() {
      let expectedOutput = "head: illegal line count -- 0";
      let actualOutput = checkErrorOfHead('n', '0', ['ankon']);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return specified error if value is negative number", function() {
      let expectedOutput = "head: illegal line count -- -1";
      assert.deepEqual(checkErrorOfHead("n", "-1", ["ankon"]), expectedOutput);
    });
  });

  describe("value error for option c", function() {
    it("should return specified error if value is a string", function() {
      let expectedOutput = "head: illegal byte count -- dx";
      assert.deepEqual(checkErrorOfHead("c", "dx", ["ankon"]), expectedOutput);
    });

    it("should return specified error if value is 0", function() {
      let expectedOutput = "head: illegal byte count -- 0";
      assert.deepEqual(checkErrorOfHead("c", "0", ["ankon"]), expectedOutput);
    });

    it("should return specified error if value is negative number", function() {
      let expectedOutput = "head: illegal byte count -- -1";
      assert.deepEqual(checkErrorOfHead("c", "-1", ["ankon"]), expectedOutput);
    });
  });

  describe("file error", function() {
    it("should return specified error if option and value both are valid and no files given", function() {
      let expectedOutput =
        "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(checkErrorOfHead("c", "1", []), expectedOutput);
    });
  });

  describe("no error", function() {
    it("should return undefined if no error is there", function() {
      assert.deepEqual(checkErrorOfHead("n", "10", ["ankon"]), undefined);
    });
  });
});

describe("isOptionInvalid", function() {
  it("should return true if option is neither n nor c", function() {
    assert.deepEqual(isOptionError("a"), true);
  });

  it("should return false if option is n", function() {
    assert.deepEqual(isOptionError("n"), false);
  });

  it("should return false if option is c", function() {
    assert.deepEqual(isOptionError("c"), false);
  });

  it("should return true is option is a number", function() {
    assert.deepEqual(isOptionError("1"), true);
  });
});

describe("isValueInvalid", function() {
  it("should return true if value is negative", function() {
    assert.deepEqual(isValueError("-1"), true);
  });

  it("should return true if value is 0", function() {
    assert.deepEqual(isValueError("0"), true);
  });

  it("should return true if value is string", function() {
    assert.deepEqual(isValueError("ax"), true);
  });
});

describe("isFileError", () => {
  it("should return true if file is more than zero", () => {
    assert.deepEqual(isFileError(["ankon"]), false);
  });
  it("should return false if there is no file", () => {
    assert.deepEqual(isFileError([]), true);
  });
});

describe("checkErrorOfTail", () => {
  describe("option error", function() {
    it("should return specified error if option is a character and file is given", function() {
      let expectedOutput =
        "tail: illegal option -- x\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(checkErrorOfTail("x", 10, ["ankon"]), expectedOutput);
    });

    it("should return specified error if option is a character and file is not given", function() {
      let expectedOutput =
        "tail: illegal option -- x\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(checkErrorOfTail("x", 10, []), expectedOutput);
    });
  });

  describe("value error for option n", function() {
    it("should return specified error if value is a string", function() {
      let expectedOutput = "tail: illegal offset -- dx";
      assert.deepEqual(checkErrorOfTail("n", "dx", ["ankon"]), expectedOutput);
    });

    it("should return specified error if value is negative number", function() {
      let expectedOutput = "tail: illegal offset -- -1";
      assert.deepEqual(checkErrorOfTail("n", "-1", ["ankon"]), expectedOutput);
    });
  });

  describe("value error for option c", function() {
    it("should return specified error if value is a string", function() {
      let expectedOutput = "tail: illegal offset -- dx";
      assert.deepEqual(checkErrorOfTail("c", "dx", ["ankon"]), expectedOutput);
    });

    it("should return specified error if value is negative number", function() {
      let expectedOutput = "tail: illegal offset -- -1";
      assert.deepEqual(checkErrorOfTail("c", "-1", ["ankon"]), expectedOutput);
    });
  });

  describe("file error", function() {
    it("should return specified error if option and value both are valid and no files given", function() {
      let expectedOutput =
        "tail: option requires an argument -- c\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(checkErrorOfTail("c", "1", []), expectedOutput);
    });
  });

  describe("no error", function() {
    it("should return undefined if no error is there", function() {
      assert.deepEqual(checkErrorOfTail("n", "10", ["ankon"]), undefined);
    });
  });
});
