const fs = require('fs');
const path = require('path'); //подключаем модули

const textFile = path.join(__dirname, 'text.txt'); // путь к файлу
const rs = fs.createReadStream(textFile, 'utf-8'); // подключаю метод ReadStream

rs.on('data', (data) => {
  console.log(data);
});

rs.on('error', (err) => {
  console.error(err);
});
