const fs = require('fs');

const { 
  apply,
  errorCheck
} = require('./src/lib.js');
const {
  separateTypeValue,
  generateResult
} = require('./src/head_IO.js');

let inputs = process.argv.slice(2);
let arrangedInputs = separateTypeValue(inputs);
let fileData = arrangedInputs.files.map( x => apply(fs.readFileSync,x,'utf-8'));
let error = errorCheck(arrangedInputs.type,arrangedInputs.value);
if(error){
  console.log(error);
  process.exit(1);
}
let result = fileData.map( x => generateResult(x,arrangedInputs));
console.log(result.join(''));
