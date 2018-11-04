let join = require("path").join;
let fs = require("fs");
let assert = require("assert");
let removeRf = require("remove-rf");

let copyR = require("..");

let source = join(__dirname, "d1");
let dest = join(__dirname, "d2");

process.on("exit", code => {
  removeRf(join(__dirname, "d2"));
});

copyR(source, dest);

if (!fs.existsSync(join(__dirname, "d2/f1"))) {
  assert.fail("first copy failed!");
}

copyR(source, dest);

if (!fs.existsSync(join(__dirname, "d2/d1/f1"))) {
  assert.fail("second copy failed!");
}

console.log("pass!");
