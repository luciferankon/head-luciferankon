const assert = require("assert");
const {
  parser,
  isOptionDash,
  isOnlyOption,
  isOnlyValue,
  isOptionAndValue,
  generateHeader,
  addHeader
} = require("../src/IO.js");

describe("parser", function() {
  describe("should return expected option, count, filePaths", function() {
    it("there is no option or count and two filePaths specified", function() {
      let expectedOutput = {
        option: "n",
        count: 10,
        filePaths: ["ankon", "chandu"],
        headOrTail: "head"
      };
      let actualOutput = parser(['ankon','chandu'],'head');
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("when there is only count and two filePaths are specified", function() {
      let expectedOutput = {
        option: "n",
        count: 5,
        filePaths: ["ankon", "chandu"],
        headOrTail: "head"
      };
      let actualOutput = parser(["-5", "ankon", "chandu"],'head');
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("when both option and count and two filePaths are specified together", function() {
      let expectedOutput = {
        option: "c",
        count: 3,
        filePaths: ["ankon", "chandu"],
        headOrTail: "head"
      };
      let actualOutput = parser(["-c3", "ankon", "chandu"],'head');
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("when option and count are given separeately and two filePaths are specified", function() {
      let expectedOutput = {
        option: "c",
        count: 3,
        filePaths: ["ankon", "chandu"],
        headOrTail: "head"
      };
      let actualOutput = parser(["-c", "3", "ankon", "chandu"],'head');
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("when option -- and two filePaths are specified", function() {
      let expectedOutput = {
        option: "n",
        count: 10,
        filePaths: ["ankon", "chandu"],
        headOrTail: "head"
      };
      let actualOutput = parser(["--", "ankon", "chandu"],'head');
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

describe("isOnlyOption", function() {
  it("it should return false if argument is not only a option", function() {
    let actualOutput = isOnlyOption('-4');
    assert.deepEqual(actualOutput, false);
  });
  it("should return true if argument is only option n", function() {
    let actualOutput = isOnlyOption('-n');
    assert.deepEqual(actualOutput, true);
  });
  it("should return true if argument is only option t", function() {
    let actualOutput = isOnlyOption('-t');
    assert.deepEqual(actualOutput, true);
  });
});

describe("isOnlyValue", function() {
  it("should return false if the arguments are not only value", function() {
    let actualOutput = isOnlyValue('-e');
    assert.deepEqual(actualOutput, false);
  });

  it("should retun true if the arguments are only value", function() {
    let actualOutput = isOnlyValue('-4');
    assert.deepEqual(actualOutput, true);
  });
});

describe("isOptionAndValue", function() {
  it("should return false if arguments are only option", function() {
    let actualOutput = isOptionAndValue('-e');
    assert.deepEqual(actualOutput, false);
  });

  it("should return false if arguments are only value", function() {
    let actualOutput = isOptionAndValue('-4');
    assert.deepEqual(actualOutput, false);
  });

  it("should return true if arguments are both option and values", function() {
    let actualOutput = isOptionAndValue('-n4');
    assert.deepEqual(actualOutput, true);
  });
});

describe('generateHeader',() => {
  it('should return header for the given file',() => {
    let expectedOutput = '==> file1 <==\n';
    let actualOutput = generateHeader('file1');
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe('addHeader',() => {
  it('should return header concatinated with content if number of filePaths are more than 1',() => {
    let expectedOutput = '==> file1 <==\n1';
    let actualOutput = addHeader(['file1','file2'],'file1','1');
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return only the content if number of filePaths is 1',() => {
    let expectedOutput = '1';
    let actualOutput = addHeader(['file1'],'file1','1');
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return content if number of filePaths is 0',() => {
    let expectedOutput = '1';
    let actualOutput = addHeader([],'file1','1');
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return empty string if number of filePaths is 0 and content is empty', () => {
    let expectedOutput = '';
    let actualOutput = addHeader([],'file1','');
    assert.deepEqual(actualOutput, expectedOutput);
  });
});