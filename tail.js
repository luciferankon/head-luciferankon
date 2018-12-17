const fs = require("fs");

const { generateResult } = require("./src/textUtils.js");

const { parser } = require("./src/IO.js");

let parsedInputs = parser(process.argv.slice(1));
let result = generateResult(fs, parsedInputs);
console.log(result);