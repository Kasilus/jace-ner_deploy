const config = require("./config")

console.log('prestart.js');

console.log(config);

console.log(config.service.host);
console.log(config.service.port);
console.log(config.service.mode);

console.log(process.env.HOST);
console.log(process.env.PORT);
console.log(process.env.MODE);
