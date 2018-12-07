const errorCheck = function(type, value, files) {
  let errorWord = {
    n: 'line',
    c: 'byte'
  };
  if (isTypeError(type)) {
    return (
      'head: illegal option -- ' +
      type +
      '\nusage: head [-n lines | -c bytes] [file ...]'
    );
  }
  if (isValueError(value)) {
    return 'head: illegal ' + errorWord[type] + ' count -- ' + value;
  }
  if (isFileError(files)) {
    return (
      'head: option requires an argument -- ' +
      type +
      '\nusage: head [-n lines | -c bytes] [file ...]'
    );
  }
};

const isTypeError = function(type) {
  return type != 'n' && type != 'c';
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
exports.errorCheck = errorCheck;
