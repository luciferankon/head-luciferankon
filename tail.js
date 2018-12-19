const fs = require("fs");

const { readAndFilter } = require("./src/textUtils.js");

const { parser } = require("./src/IO.js");

let parsedInputs = parser(process.argv.slice(1));
let result = readAndFilter(fs, parsedInputs);
console.log(result);