"use strict";

var HTMLing = require('./includes/Htmling.js');

function handler(req, res, next){
	try{
	var htmling = new HTMLing(req.params.template, req.params.url, req.params.blob);
	htmling.build().then(function(data){
		res.send(data);
    	return next();

	});

	}catch(e){
		console.log("e");
		console.log(e);
	}
    
}

module.exports  = handler;