const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const readline = require('readline'); //подключаем модули

const textFile = path.join(__dirname, 'text.txt'); //путь к файлу text.txt
const newFile = fs.createWriteStream(textFile, { flags: 'a' }); //создание файла text.txt

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); //создание интерфейса ввод/вывод

console.log('Hi! Please, enter your text:');

process.on('SIGINT', () => {
  newFile.end();
  process.exit();
}); //закрытие процесса по нажатию ctrl+c

process.on('exit', () => {
  stdout.write('The file text.txt is recorded. Bye!');
}); //создание текста в консоли после закрытия процесса

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Bye!');
    rl.close();
    newFile.end();
  } else {
    newFile.write(input + '\n');
    console.log('Great! Want to add more?');
  }
}); //условие, при котором процесс будет закрыт, если ввести exit, в противном случаи, продолжить запись с консоли
