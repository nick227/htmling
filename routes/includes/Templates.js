var templateList = {

	"default":{
		"charBreak":1115,
		"keep_tags":['img', 'h1', 'h2', 'h3', 'h5', 'b', 'a', 'code'],
		"colCount":1,
		"innerElm":{
			"elmType":"div",
			"className":"item"
		},
		"outerElm":{
			"elmType":"div",
			"className":"outer-elm"
		},
		"bodyElm":{
			"elmType":"div",
			"idName":"body-main"
		},
		"stylesheetName":"default.js",
		"scriptName":"default.js"
	},
	"kindle":{
		"charBreak":1500,
		"keep_tags":['img', 'h1', 'h2', 'h3', 'h5', 'b', 'a', 'code'],
		"colCount":2,
		"innerElm":{
			"elmType":"div",
			"className":"item"
		},
		"outerElm":{
			"elmType":"div",
			"className":"outer-elm"
		},
		"bodyElm":{
			"elmType":"div",
			"idName":"body-main"
		},
		"stylesheetName":"kindle.js",
		"scriptName":"kindle.js"
	}
};

class Templates{
	constructor(templateID, site){
		this.templateID = templateID;
		let template = templateList[this.templateID];
		for(var attr in template){
			this[attr] = template[attr];
		}
		this.stylesheet = require('./styles/'+this.stylesheetName);
		this.script = require('./scripts/'+this.stylesheetName);
		return this;
	}
}

module.exports = Templates;
