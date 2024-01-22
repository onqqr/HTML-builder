const fs = require('fs');
const path = require('path'); //подключаем модули

const textFile = path.join(__dirname, 'text.txt'); // путь к файлу

fs.readFile(textFile, 'utf-8', (err, file) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(file);
}); //показываем в консоли содержимое file с котировкой utf-8
