const fs = require("fs");

const { readAndFilter } = require("./src/fileUtils.js");

const { parser } = require("./src/IO.js");

let parsedInputs = parser(process.argv.slice(2),'tail');
let result = readAndFilter(fs, parsedInputs);
console.log(result);