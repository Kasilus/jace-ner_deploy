module.exports = {
	service:{
    host: "localhost",
    port: 5000,
		mode: process.env.NODE_ENV || "development", // production (heroku NODE_ENV variable) or development
		languages: ["uk"],
    publicDir: "./.public"
	},

	python:{
		mode: 'text',
		encoding: 'utf8',
		pythonOptions: ['-u'],
		scriptPath: './src/python/',
		pythonPath: (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'python' : 'python.exe'
	}
}
