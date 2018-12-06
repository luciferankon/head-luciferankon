const { readFileSync, existsSync, lstatSync } = require("fs");

const { generateResult } = require("./src/lib.js");

const { parser } = require("./src/head_IO.js");

let parsedInputs = parser(process.argv.slice(2));
let result = generateResult(readFileSync, existsSync, lstatSync, parsedInputs);
console.log(result);
