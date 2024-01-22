const fs = require('fs');
const path = require('path'); //подключаем модули

const secretFolder = '03-files-in-folder/secret-folder'; // путь к секретной папке

fs.readdir(secretFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  } //читаем содержимое папки, в случаи error, выводим ошибку в консоль

  files.forEach((file) => {
    if (file.name.startsWith('.')) {
      return;
    }

    const pathFiles = path.join(secretFolder, file.name); // создаем путь к секретной папке

    fs.stat(pathFiles, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        const fileName = path.basename(file.name, path.extname(file.name)); //получаем инфо о файле
        console.log(
          `${fileName} - ${path.extname(file.name)} - ${stats.size} bytes`, // вывлдим в консоль список файлов и их данных
        );
      }
    });
  });
});
