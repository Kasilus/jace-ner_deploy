const path = require("path")

module.exports = {
	models: {
		destDir: path.resolve(__dirname, '../MITIE-models'),
		source: [
			{
				lang: 'uk',
				name:'Ukrainian',
				title:"Jace NER Service for Ukrainian language",
				description:"Provides API for Named Entity Recognition of Ukrainian language. Part of Jace NLP service. Functionality of this service is based on MITIE SVM.",
				dest: "uk_model.zip",
				url: [
					"https://raw.githubusercontent.com/boldak/MITIE-NER-models/main/uk/uk_model.zip.sf-part1",
					"https://raw.githubusercontent.com/boldak/MITIE-NER-models/main/uk/uk_model.zip.sf-part2",
					"https://raw.githubusercontent.com/boldak/MITIE-NER-models/main/uk/uk_model.zip.sf-part3",
					"https://raw.githubusercontent.com/boldak/MITIE-NER-models/main/uk/uk_model.zip.sf-part4",
					"https://raw.githubusercontent.com/boldak/MITIE-NER-models/main/uk/uk_model.zip.sf-part5"
				]
			}
		]
	},

	swagger_ui_theme: "material" // available: material, feeling-blue, flattop, monokai, muted, newspaper, outline

}
