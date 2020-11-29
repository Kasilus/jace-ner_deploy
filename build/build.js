
const _ = require("lodash")
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const chalk = require("chalk")
const unzip = require("./unzip")
const download = require("./download")
const fs = require("fs").promises
const fse = require("fs-extra")
const path = require("path")
const os = require("os")
let frame = elegantSpinner();

let config = _.extend(require("../config"), require("./build.config"))

let languages = config.models.source;

languages.forEach((language, index) => {
	const lang = language.lang;

	console.log(`JACE-NER SERVICE POSTINSTALL IN ${config.service.mode} MODE`)
	console.log(`Install MITIE NER model for ${config.models.source[index].name} language`)

	let tempDirectory = ''


	fs.mkdtemp(path.join(os.tmpdir(), 'MITIE-'))

		.then( dir => {
			console.log(`Create temp directory ${dir}`)
			tempDirectory = dir
			return dir
		})

		.then( tempDir => {
			if(config.models.source[index].url){
				console.log(`Download ${config.models.source[index].url.join("\n")}`);
				return download(config.models.source[index].url, tempDir, config.models.source[index].dest)
			}
			if(config.models.source[index].file) return new Promise( resolve => { resolve(config.models.source[index].file)})

		})

		.then( filePath => {
			console.log(`Create model directory ${config.models.destDir}`)
			return fse.mkdirs(config.models.destDir).then( () => filePath )
		})

		.then( filePath => {
			console.log(`Extract model into ${config.models.destDir}`);
			return unzip(filePath, config.models.destDir)
		})

		.then( () => {
			console.log(`Remove temp ${tempDirectory}`)
			fse.remove(tempDirectory)
		})

		.then( () => {
			console.log(chalk.green(`NER Model for ${config.models.source[index].name} language is installed into ${config.models.destDir}`))
		})

		.catch( e => {
			console.log(chalk.red(e.toString()))
		});

});

console.log(`Install Swagger UI Theme "${config.swagger_ui_theme}"`)
fse.copy(
	path.resolve(`./node_modules/swagger-ui-themes/themes/3.x/theme-${config.swagger_ui_theme}.css`),
	path.resolve(`${config.service.publicDir}/sw-theme.css`),
	{ overwrite: true}
);

if(config.service.mode == "development"){
	console.log("Install MITIE")
	let installer = require('execa')("pip", "install -r requirements.txt".split(" "))
	let stream = installer.stdout;
		stream.pipe(process.stdout);
	// return installer
}
