var templateList = {

	"default":{
		"charBreak":2000,
		"keep_tags":['img', 'a'],
		"colCount":1,
		"innerElm":{
			"elmType":"div",
			"className":"item"
		},
		"outerElm":{
			"elmType":"div",
			"className":"outer-main"
		},
		"bodyElm":{
			"elmType":"div",
			"idName":"body-main"
		},
		"stylesheetName":"default.js",
		"scriptName":"default.js"
	},
	"kindle":{
		"charBreak":1750,
		"keep_tags":['img'],
		"colCount":2,
		"innerElm":{
			"elmType":"div",
			"className":"item"
		},
		"outerElm":{
			"elmType":"div",
			"className":"outer-main"
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
