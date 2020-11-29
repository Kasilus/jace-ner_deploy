const path = require('path');
const execa = require('execa');

const config = require('./config');

let languages = config.service.languages;

let command = '';
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if (index != 0 && index != 1) {
    command += val + ' ';
  }
});

console.log(command);

languages.forEach(lang => {
  let langPath = path.join(__dirname, '/lang_servers/', lang);
  console.log(path.join(langPath, 'lang_server.js'));
  let installer = execa.command(command.replace('lang_server.js', path.join(langPath, 'lang_server.js')));
  let stream = installer.stdout;
  stream.pipe(process.stdout);
});
