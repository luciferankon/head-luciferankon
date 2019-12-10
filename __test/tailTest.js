const assert=require('assert');
const fs=require('fs');
const shelljs=require('shelljs');

const isEmpty = str => str==="";
const isNotEmpty = str => !isEmpty(str);
const wordList=fs.readFileSync('./__test/words_1','utf8').split(/\n/).filter(isNotEmpty);
const smallWordList=fs.readFileSync('./__test/small_1','utf8').split(/\n/).filter(isNotEmpty);

describe('tail',() => {
  describe('default arguments', () => {
    it('should handle default arguments for a single file',() => {
      let output=shelljs.exec('node ./tail.js ./__test/words_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/);
      assert.deepEqual(actualLines,wordList.slice(-10));
    });
  
    it('should handle default arguments for a single file that has fewer than default number of lines',() => {
      let output=shelljs.exec('node ./tail.js ./__test/small_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/);
      assert.deepEqual(actualLines,wordList.slice(0,3));
    });
  })

  describe('argument for number of lines',() => {
    it('should only list as many lines as specified',() => {
      let output=shelljs.exec('node ./tail.js -n5 ./__test/words_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/);
      assert.deepEqual(actualLines,wordList.slice(-5));
    });

    it('should list the contents of the entire file if argument is greater than number of lines in file',() => {
      let output=shelljs.exec('node ./tail.js -n5 ./__test/small_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/);
      assert.deepEqual(actualLines,wordList.slice(0,3));
    });
  });

  describe('argument parsing', () => {
    it('should parse arguments with a space in betwen -n and the number',() => {
      let output=shelljs.exec('node ./tail.js -n 5 ./__test/words_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/);
      assert.deepEqual(actualLines,wordList.slice(-5));
    });

    it('should parse arguments with a space in betwen -c and the number',() => {
      let output=shelljs.exec('node ./tail.js -c 17 ./__test/words_1',{silent:true});
      let actualOutput=output.stdout.trim();
      assert.deepEqual(actualOutput,"rish\nroof\ngleaner");    
    });

    it('should parse arguments that are simply prefixed with a -',() => {
      let output=shelljs.exec('node ./tail.js -5 ./__test/words_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/);
      assert.deepEqual(actualLines,wordList.slice(-5));
    });

    it('should treat 0 as an legal line count',() => {
      let output=shelljs.exec('node ./tail.js -n0 ./__test/words_1',{silent:true});
      assert.equal(output.stdout.trim(),"");
    });
  })

  describe('-c option',() => {
    it('should handle byte count option',() => {
      let output=shelljs.exec('node ./tail.js -c5 ./__test/words_1',{silent:true});
      let actualOutput=output.stdout.trim();
      assert.deepEqual(actualOutput,"eaner");    
    });
    it('should handle byte count option across newlines',() => {
      let output=shelljs.exec('node ./tail.js -c17 ./__test/words_1',{silent:true});
      let actualOutput=output.stdout.trim();
      assert.deepEqual(actualOutput,"rish\nroof\ngleaner");    
    });  
  });

  describe('multiple files',() => {
    it('should handle default arguments for multiple files',() => {
      let output=shelljs.exec('node ./tail.js ./__test/words_1 ./__test/small_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/).filter(isNotEmpty);
      let expectedLines = ["==> ./__test/words_1 <=="];
      expectedLines = expectedLines.concat(wordList.slice(-10))
      expectedLines = expectedLines.concat(["==> ./__test/small_1 <=="]);
      expectedLines = expectedLines.concat(smallWordList.slice(-10));
      assert.deepEqual(actualLines,expectedLines);
    });

    it('should handle -n for multiple files',() => {
      let output=shelljs.exec('node ./tail.js -n3 ./__test/words_1 ./__test/small_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/).filter(isNotEmpty);
      let expectedLines = ["==> ./__test/words_1 <=="];
      expectedLines = expectedLines.concat(wordList.slice(-3))
      expectedLines = expectedLines.concat(["==> ./__test/small_1 <=="]);
      expectedLines = expectedLines.concat(smallWordList.slice(0,3));
      assert.deepEqual(actualLines,expectedLines);
    });

    it('should handle -c for multiple files',() => {
      let output=shelljs.exec('node ./tail.js -c3 ./__test/words_1 ./__test/small_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/).filter(isNotEmpty);
      let expectedLines = ["==> ./__test/words_1 <==","ner","==> ./__test/small_1 <==","sed"];
      assert.deepEqual(actualLines,expectedLines);
    });  
  });

  describe('error conditions',() => {
    it('should provide an error for a single missing file',() => {
      let output=shelljs.exec('node ./tail.js ./__test/missing_file',{silent:true});
      let actualMessage=output.stdout.trim();
      let expectedMessage='tail: ./__test/missing_file: No such file or directory'
      assert.deepEqual(actualMessage,expectedMessage);
    });

    it('should provide the error message for a missing file but list other files that are present',() => {
      let output=shelljs.exec('node ./tail.js ./__test/missing_file ./__test/words_1',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/).filter(isNotEmpty);
      let expectedLines=['tail: ./__test/missing_file: No such file or directory'];
      expectedLines.push("==> ./__test/words_1 <==");
      expectedLines = expectedLines.concat(wordList.slice(-10));
      assert.deepEqual(actualLines,expectedLines);
    });

    it('should provide the error message for a missing file listed at the end',() => {
      let output=shelljs.exec('node ./tail.js ./__test/words_1 ./__test/missing_file',{silent:true});
      let actualLines=output.stdout.trim().split(/\n/).filter(isNotEmpty);
      let expectedLines=[];
      expectedLines = expectedLines.concat(['tail: ./__test/missing_file: No such file or directory']);
      expectedLines.push("==> ./__test/words_1 <==");
      expectedLines = expectedLines.concat(wordList.slice(-10));
      assert.deepEqual(actualLines,expectedLines);
    });

    it('should provide an error for invalid values for -n',() => {
      let output=shelljs.exec('node ./tail.js -n10x ./__test/words_1',{silent:true});
      let actualMessage=output.stdout.trim();
      let expectedMessage='tail: illegal offset -- 10x'
      assert.deepEqual(actualMessage,expectedMessage);
    });

    it('should provide an error for invalid values for -c',() => {
      let output=shelljs.exec('node ./tail.js -c10x ./__test/words_1',{silent:true});
      let actualMessage=output.stdout.trim();
      let expectedMessage='tail: illegal offset -- 10x'
      assert.deepEqual(actualMessage,expectedMessage);
    });
  });
});