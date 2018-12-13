const assert = require("assert");
const {
  generateResult,
  filterNumOfLine,
  filterNumOfChar,
  selectOperationType
} = require("../src/lib.js");

const isZero = function(element) {
  return {
    isFile: function() {
      return element == 0;
    }
  };
};

const isMultipleOf3 = function(element) {
  return element % 3 == 0;
};

const add = function(first, second) {
  return first + second;
};

describe("filterNumOfLine", function() {
  let file = "node ./head.js -n5 file1\n";
  file += "node ./head.js -n 5 file1\n";
  file += "node ./head.js -5 file1\n";
  file += "node ./head.js file1 file2\n";
  file += "node ./head.js -n 5 file1 file2\n";
  file += "node ./head.js -n5 file1 file2\n";
  file += "node ./head.js -5 file1 file2\n";
  file += "node ./head.js -c5 file1\n";
  file += "node ./head.js -c 5 file1\n";
  file += "node ./head.js -c5 file1 file2\n";
  file += "node ./head.js -c 5 file1 file2\n";

  it("should return 10 lines of the file if num of line is not specified ", function() {
    let expectedOutput = "node ./head.js -n5 file1\n";
    expectedOutput += "node ./head.js -n 5 file1\n";
    expectedOutput += "node ./head.js -5 file1\n";
    expectedOutput += "node ./head.js file1 file2\n";
    expectedOutput += "node ./head.js -n 5 file1 file2\n";
    expectedOutput += "node ./head.js -n5 file1 file2\n";
    expectedOutput += "node ./head.js -5 file1 file2\n";
    expectedOutput += "node ./head.js -c5 file1\n";
    expectedOutput += "node ./head.js -c 5 file1\n";
    expectedOutput += "node ./head.js -c5 file1 file2";
    assert.deepEqual(filterNumOfLine(file), expectedOutput);
  });

  let expectedOutput = "node ./head.js -n5 file1\n";
  expectedOutput += "node ./head.js -n 5 file1\n";
  expectedOutput += "node ./head.js -5 file1\n";
  expectedOutput += "node ./head.js file1 file2\n";
  expectedOutput += "node ./head.js -n 5 file1 file2";
  it("should return specified no of lines if num of lines is specified", function() {
    assert.deepEqual(filterNumOfLine(file, 5), expectedOutput);
  });

  it("should return empty string for 0 num of line", function() {
    assert.deepEqual(filterNumOfLine(file, 0), "");
  });

  it('should return specified number of lines from last',function(){
    expectedOutput = 'node ./head.js -c 5 file1 file2\n';
    assert.deepEqual(filterNumOfLine(file, 1, 'tail'), expectedOutput);
  });
});

describe("filterNumOfChar", function() {
  it("should give specified no of chars", function() {
    let file = "node ./head.js -n5 file1\n";
    assert.deepEqual(filterNumOfChar(file, 5), "node ");
  });
  it("should give specified no of chars from last",function(){
    let file = "node ./head.js -n5 file1\n";
    assert.deepEqual(filterNumOfChar(file, 5, 'tail'),'ile1\n');
  });
});

describe("selectOperationType", function() {
  let file = "node ./head.js -n5 file1\n";
  file += "node ./head.js -n 5 file1\n";
  file += "node ./head.js -5 file1\n";
  file += "node ./head.js file1 file2\n";
  file += "node ./head.js -n 5 file1 file2\n";
  file += "node ./head.js -n5 file1 file2\n";
  file += "node ./head.js -5 file1 file2\n";
  file += "node ./head.js -c5 file1\n";
  file += "node ./head.js -c 5 file1\n";
  file += "node ./head.js -c5 file1 file2\n";
  file += "node ./head.js -c 5 file1 file2\n";
  it("should return specified number of lines if type is n", function() {
    let expectedOutput = "node ./head.js -n5 file1\n";
    expectedOutput += "node ./head.js -n 5 file1\n";
    expectedOutput += "node ./head.js -5 file1\n";
    expectedOutput += "node ./head.js file1 file2\n";
    expectedOutput += "node ./head.js -n 5 file1 file2";
    assert.deepEqual(selectOperationType(file, 5, "n"), expectedOutput);
  });
  it("should return specified number of characters if type is c", function() {
    let expectedOutput = "node ";
    assert.deepEqual(selectOperationType(file, 5, "c"), expectedOutput);
  });
  it("should return 10 lines if type and number nothing is specified", function() {
    let expectedOutput = "node ./head.js -n5 file1\n";
    expectedOutput += "node ./head.js -n 5 file1\n";
    expectedOutput += "node ./head.js -5 file1\n";
    expectedOutput += "node ./head.js file1 file2\n";
    expectedOutput += "node ./head.js -n 5 file1 file2\n";
    expectedOutput += "node ./head.js -n5 file1 file2\n";
    expectedOutput += "node ./head.js -5 file1 file2\n";
    expectedOutput += "node ./head.js -c5 file1\n";
    expectedOutput += "node ./head.js -c 5 file1\n";
    expectedOutput += "node ./head.js -c5 file1 file2";
    assert.deepEqual(selectOperationType(file), expectedOutput);
  });
});

describe("generateResult", function() {
  describe("for head.js", function() {
    describe("return error", function() {
      it("should return an error if anything is wrong", function() {
        let expectedOutput = "head: illegal line count -- -1";
        let input = { type: "n", range: "-1", files: ["ankon"], context: "head"};
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context =
          "head";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });
    });

    describe("test mock function for existsSync", function() {
      it("should return the specified string if return value is false", function() {
        let expectedOutput = "head: 2: No such file or directory";
        let input = { type: "n", range: "3", files: [2], context: "head"};
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "head";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });

      it("should not return the specified string if return value is true", function() {
        let expectedOutput = "head: Error reading 3";
        let input = { type: "n", range: "3", files: [3], context: "head"};
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "head"
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });
    });

    describe("test mock function for readFileSync", function() {
      it("should return concated string of the arguments", function() {
        let expectedOutput = "0utf-8";
        let input = { type: "n", range: "3", files: [0], context: "head"};
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "head";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });

      it("should return concated string of the arguments for multiple files", function() {
        let expectedOutput = "==> 0 <==\n0utf-8\n\n==> 0 <==\n0utf-8";
        let input = { type: "n", range: "3", files: [0, 0], context: "head"};
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "head"
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });
    });

    describe("test mock function for lstatSync", function() {
      it("should return specified string if the return value is false", function() {
        let expectedOutput = "head: Error reading 3";
        let input = { type: "n", range: "3", files: [3], context: "head"};
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "head";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });
    });
  });
  describe('for tail.js',function(){
    describe("return error", function() {
      it("should return an error if anything is wrong", function() {
        let expectedOutput = "tail: illegal offset -- -1";
        let input = { type: "n", range: "-1", files: ["ankon"], context: "tail" };
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "tail";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });
    });

    describe("test mock function for existsSync", function() {
      it("should return the specified string if return value is false", function() {
        let expectedOutput = "tail: 2: No such file or directory";
        let input = { type: "n", range: "3", files: [2], context: "tail" };
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "tail";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });

      it("should not return the specified string if return value is true", function() {
        let expectedOutput = "tail: Error reading 3";
        let input = { type: "n", range: "3", files: [3], context: "tail" };
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "tail";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });
    });

    describe("test mock function for readFileSync", function() {
      it("should return concated string of the arguments", function() {
        let expectedOutput = "0utf-8\n";
        let input = { type: "n", range: "3", files: [0], context: "tail" };
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "tail";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });

      it("should return concated string of the arguments for multiple files", function() {
        let expectedOutput = "==> 0 <==\n0utf-8\n\n\n==> 0 <==\n0utf-8\n";
        let input = { type: "n", range: "3", files: [0, 0], context: "tail" };
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "tail";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });
    });

    describe("test mock function for lstatSync", function() {
      it("should return specified string if the return value is false", function() {
        let expectedOutput = "tail: Error reading 3";
        let input = { type: "n", range: "3", files: [3], context: "tail" };
        let functions = {
          readFileSync: add,
          existsSync: isMultipleOf3,
          lstatSync: isZero
        };
        let context = "tail";
        assert.deepEqual(
          generateResult(functions, input, context),
          expectedOutput
        );
      });
    });
  });
});
