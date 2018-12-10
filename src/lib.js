const { errorCheck } = require('./errorLib.js');

const generateResult = function(fileSystem, arrangedInputs,sourceCode) {
  let context = sourceCode.split('/')[sourceCode.split('/').length - 1];
  if(context == 'tail.js'){
    arrangedInputs.range = Math.abs(arrangedInputs.range);
  }
  let { type, range, files } = arrangedInputs;
  let error = errorCheck(type, range, files);
  if (error) {
    return error;
  }
  let validateFile = formatResult.bind(null, fileSystem, arrangedInputs, context);
  return files.map(validateFile).join('\n\n');
};

const formatResult = function(
  { readFileSync, existsSync, lstatSync },
  arrangedInputs,
  context,
  file
) {
  if (!existsSync(file)) {
    return 'head: ' + file + ': No such file or directory';
  }
  if (!lstatSync(file).isFile()) {
    return 'head: Error reading ' + file;
  }
  return getResult(readFileSync, arrangedInputs, context, file);
};

const getResult = function(readFileSync, { type, range, files }, context, file) {
  let fileName = generateHeader(file);
  let fileData = readFileSync(file, 'utf-8');
  let result = selectOperationType(fileData, range, type, context);
  return addHeader(files, fileName, result);
};

const generateHeader = function(file) {
  return '==> ' + file + ' <==\n';
};

const addHeader = function(files, fileName, result) {
  if (files.length > 1) {
    return fileName + result;
  }
  return result;
};

const filterNumOfLine = function(file, num = 10, context) {
  if(context == "tail.js"){
    return file.split('\n').slice(file.split('\n').length - num -1).join('\n');
  }
  return file
    .split('\n')
    .slice(0,num)
    .join('\n');
};

const filterNumOfChar = function(file, num, context) {
  if(context == "tail.js"){
    return file.slice(file.length - num);
  }
  return file.slice(0, num);
};

const selectOperationType = function(file, num, type = 'n',context) {
  let opeartion = {
    n: filterNumOfLine,
    c: filterNumOfChar
  };
  return opeartion[type](file, num, context);
};

exports.generateResult = generateResult;
exports.filterNumOfLine = filterNumOfLine;
exports.filterNumOfChar = filterNumOfChar;
exports.selectOperationType = selectOperationType;
