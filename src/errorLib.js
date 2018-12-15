const HEADOPTION = 'head: option requires an argument -- ';
const HEADUSAGE = 'usage: head [-n lines | -c bytes] [file ...]';
const HEADILLEGALOPTION = 'head: illegal option -- ';
const TAILOPTION = 'tail: option requires an argument -- ';
const TAILUSAGE = 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
const TAILILLEGALOPTION = 'tail: illegal option -- ';

const errorCheckHead = function(type, value, files) {
  let errorWord = {
    n: "line",
    c: "byte"
  };
  if (isTypeError(type)) {
    return HEADILLEGALOPTION + type + '\n' + HEADUSAGE;
  }

  if (isValueError(value)) {
    return "head: illegal " + errorWord[type] + " count -- " + value;
  }

  if (isFileError(files)) {
    return HEADOPTION + type + '\n' + HEADUSAGE;
  }
};

const errorCheckTail = function(type, value, files) {
  if (isTypeError(type)) {
    return TAILILLEGALOPTION + type + '\n' + TAILUSAGE;
  }

  if (isFileError(files)) {
    return TAILOPTION + type + '\n' + TAILUSAGE;
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

exports.isFileError = isFileError;
exports.isValueError = isValueError;
exports.isTypeError = isTypeError;
exports.errorCheckHead = errorCheckHead;
exports.errorCheckTail = errorCheckTail;
