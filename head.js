const fs = require('fs');

const { 
  apply,
  generateResult
} = require('./src/lib.js');

const {
  errorCheck
} = require('./src/errorLib.js');

const {
  parser
} = require('./src/head_IO.js');

let parsedInputs = parser(process.argv.slice(2));
let result = generateResult(fs.readFileSync,fs.existsSync,fs.lstatSync,parsedInputs);
console.log(result);
