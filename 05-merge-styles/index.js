const { readdir, readFile } = require('fs/promises');
const path = require('path');
const fs = require('fs'); // подключаем модули

const styleFiles = path.resolve(__dirname, 'styles'); // путь к стилям 1,2,3 в папке стайлс
const bundleFile = path.resolve(__dirname, 'project-dist', 'bundle.css'); // путь для создания bundle.css

async function merge() {
  try {
    const files = await readdir(styleFiles, {
      withFileTypes: true,
    }); // считываем содержимое папки styles и return arr с инфой о файлах
    const out = fs.createWriteStream(bundleFile, { encoding: 'utf-8' }); // создание потока записи в bundle.css
    // проходим по каждому файлу
    for (const file of files) {
      const filePath = path.resolve(__dirname, 'styles', file.name);
      if (file.isFile() && path.extname(filePath) === '.css') {
        const filePage = await readFile(filePath, { encoding: 'utf-8' });
        out.write(filePage + '\n'); // добавляем в поток файлы и разделяем их
      } // проверяем, является ли файл файлом и имеет ли расширение .css
    }
    out.end();
  } catch (error) {
    console.log(error); // в случаи ошибки, показать в консоли
  }
}
merge().catch((error) => console.log(error)); // вызов и обработка функции с возможными ошибками
