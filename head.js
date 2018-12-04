const fs = require('fs');
const { 
  apply,
  selectOperationType
} = require('./src/lib.js');
const {
  separateTypeValue
} = require('./src/head_IO.js');

const mapper = function(file){
  let fileData = apply(fs.readFileSync,file,'utf-8');
  let result = selectOperationType(fileData,value[0],type[0]);
  if(files.length - 1){
    result = '==> ' + file + ' <==\n\n' + result + '\n\n';
  }
  return result;
}

let inputs = process.argv.slice(2);
let arrangedInputs = separateTypeValue(inputs);
let {type,value,files} = arrangedInputs;
let result = files.map(mapper);
console.log(result.join(''));
