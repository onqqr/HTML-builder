const fs = require('fs');
const path = require('path');
const textFile = path.join(__dirname, 'text.txt');

fs.readFile(textFile, 'utf-8', (err, file) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(file);
});
