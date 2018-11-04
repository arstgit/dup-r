let fs = require("fs");
let path = require("path");

module.exports = copyDirRecursiveSync;

function copyDirRecursiveSync(source, target) {
  let files = [];

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  } else {
    target = path.join(target, path.basename(source));
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function(file) {
      let curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyDirRecursiveSync(curSource, target);
      } else {
        copyFileSync(curSource, target);
      }
    });
  }
}

function copyFileSync(source, target) {
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      target = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(target, fs.readFileSync(source));
}
