const { readdir, mkdir, rm, copyFile } = require('fs/promises');
const path = require('path'); //подключаем модули

const srcPath = path.resolve(__dirname, 'files'); // путь к исходной папке
const destPath = path.resolve(__dirname, 'files-copy'); // путь к новой папке

async function copyDir(srcPath, destPath) {
  try {
    await rm(destPath, { force: true, recursive: true });
    await mkdir(destPath, { recursive: true });
    const files = await readdir(srcPath, { withFileTypes: true }); // содержимое папки files

    for (const file of files) {
      if (file.isFile()) {
        await copyFile(
          path.resolve(srcPath, file.name),
          path.resolve(destPath, file.name),
        );
      } // является ли текущий эленмент файлом
    }
  } catch (error) {
    console.error('Error: ', error); // если произошла ошибка, выводим сообщение
  }
}
copyDir(srcPath, destPath); // вызов функции для начала копирования
