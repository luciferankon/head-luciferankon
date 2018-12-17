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
      let actualOutput = checkErrorOfHead('n', '-1', ['ankon']);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("value error for option c", function() {
    it("should return specified error if value is a string", function() {
      let expectedOutput = "head: illegal byte count -- dx";
      let actualOutput = checkErrorOfHead('c', 'dx', ['ankon']);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return specified error if value is 0", function() {
      let expectedOutput = "head: illegal byte count -- 0";
      let actualOutput = checkErrorOfHead('c', '0', ['ankon']);
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return specified error if value is negative number", function() {
      let expectedOutput = "head: illegal byte count -- -1";
      let actualOutput = checkErrorOfHead('c', '-1', ['ankon']);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("file error", function() {
    it("should return specified error if option and value both are valid and no files given", function() {
      let expectedOutput =
        "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]";
      let actualOutput = checkErrorOfHead('c', '1', []);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("no error", function() {
    it("should return undefined if no error is there", function() {
      let actualOutput = checkErrorOfHead('n', '10', ['ankon']);
      assert.deepEqual(actualOutput, undefined);
    });
  });
});

describe("isOptionInvalid", function() {
  it("should return true if option is neither n nor c", function() {
    let actualOutput = isOptionError('a');
    assert.deepEqual(actualOutput, true);
  });

  it("should return false if option is n", function() {
    let actualOutput = isOptionError('n');
    assert.deepEqual(actualOutput, false);
  });

  it("should return false if option is c", function() {
    let actualOutput = isOptionError('c');
    assert.deepEqual(actualOutput, false);
  });

  it("should return true is option is a number", function() {
    let actualOutput = isOptionError('1');
    assert.deepEqual(actualOutput, true);
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
