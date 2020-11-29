const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const config = require('../config');
let servers_deploy = {};

let languages = config.service.languages;
let port = config.service.port;
const files = ['lang_routes.js', 'lang_server.js'];

languages.forEach(lang => {

  const servicePath = path.join(__dirname, '../lang_servers/' + lang);
  fsPromises.mkdir(servicePath, { recursive: true })

  .then(function() {
      console.log(`Directory for lang ${lang} created successfully`);
  })

  .then(function() {
    files.forEach(file => {
      const src = path.join(__dirname, '../src/javascript/' + file);
      const dest = servicePath + '/' + file;
      fs.copyFile(src, dest, (err) => {
        if (err) throw err;
        console.log(`${src} was copied to ${dest}`);
      });
    });
  })

  .then(function() {
    // copy config
    const src = path.join(__dirname, '../lang_server.config.js');
    const dest = path.join(servicePath, '/config.js');
    fs.copyFile(src, dest, (err) => {
      if (err) throw err;
      console.log(`${src} was copied to ${dest}`);

      let config = require(dest);
      config.service.lang = lang;
      config.service.port = ++port;
      fs.writeFile(dest, 'module.exports = ' + JSON.stringify(config, null, " "), (err) => {
        if (err) throw err;
        console.log(`config.js for ${lang} language was created`);
      });

      servers_deploy[config.service.lang] = config.service.host + ':' + config.service.port;
      fs.writeFile(path.join(__dirname, '../servers_deploy.json'), JSON.stringify(servers_deploy, null, " "), (err) => {
        if (err) throw err;
        console.log(`servers_deploy.json for ${lang} was filled`);
      });
    })
  })

  .catch(function(err) {
      console.log(err);
  });

});
