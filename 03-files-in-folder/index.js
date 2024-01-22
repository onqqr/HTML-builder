const fs = require('fs');
const path = require('path'); //подключаем модули

const secretFolder = '03-files-in-folder/secret-folder'; // путь к секретной папке

fs.readdir(secretFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    if (file.name.startsWith('.')) {
      return;
    }

    const pathFiles = path.join(secretFolder, file.name);

    fs.stat(pathFiles, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        const fileName = path.basename(file.name, path.extname(file.name));
        console.log(
          `${fileName} - ${path.extname(file.name)} - ${stats.size} bytes`,
        );
      } else if (stats.isDirectory() || file.name.startsWith('.')) {
        console.log(`${file.name} - Directory`);
      }
    });
  });
});
