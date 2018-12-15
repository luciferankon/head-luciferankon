const HEAD_OPTION = 'head: option requires an argument -- ';
const HEAD_USAGE = 'usage: head [-n lines | -c bytes] [file ...]';
const HEAD_ILLEGAL_OPTION = 'head: illegal option -- ';
const TAIL_OPTION = 'tail: option requires an argument -- ';
const TAIL_USAGE = 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
const TAIL_ILLEGAL_OPTION = 'tail: illegal option -- ';

const errorCheckHead = function(type, value, files) {
  let errorWord = {
    n: "line",
    c: "byte"
  };
  if (isTypeError(type)) {
    return HEAD_ILLEGAL_OPTION + type + '\n' + HEAD_USAGE;
  }

  if (isValueError(value)) {
    return "head: illegal " + errorWord[type] + " count -- " + value;
  }

  if (isFileError(files)) {
    return HEAD_OPTION + type + '\n' + HEAD_USAGE;
  }
};

const errorCheckTail = function(type, value, files) {
  if (isTypeError(type)) {
    return TAIL_ILLEGAL_OPTION + type + '\n' + TAIL_USAGE;
  }

  if (isFileError(files)) {
    return TAIL_OPTION + type + '\n' + TAIL_USAGE;
  }

  if (isValueError(value + 1)) {
    return "tail: illegal offset -- " + value;
  }
};

const isTypeError = function(type) {
  return type != "n" && type != "c";
};

const isValueError = function(value) {
  return value < 1 || (isNaN(value) && value != undefined);
};

const isFileError = function(files) {
  return files.length == 0;
};

module.exports = {isFileError, isValueError, isTypeError, errorCheckHead, errorCheckTail};
