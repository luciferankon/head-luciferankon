const fs = require("fs");

const { generateResult } = require("./src/lib.js");

const { parser } = require("./src/inputOutputLib.js");

let parsedInputs = parser(process.argv.slice(1));
let result = generateResult(fs, parsedInputs);
console.log(result);
