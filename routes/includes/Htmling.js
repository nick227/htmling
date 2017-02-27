var striptags = require('striptags');
var Templates = require('./Templates.js');
var request = require('request');

class HTMLing{
	constructor(template, site, pageData){
		this.template = new Templates(template, site);
		this.site = site.trim();
		this.pageData = pageData;
		this.html = '';
		return this;
	}
	build(){
		var self = this;
		function _build(callback){
			self.striptags();
			self.templatize();
			self.stylize();
			callback({html:self.html, script:self.template.script});
		}
		return new Promise(function(resolve,reject){
			try{

				if(self.isValidUrl(self.site)){
					self.loadUrl().then(function(res){

						self.pageData = res;
						_build(resolve);
					});

				}else{

					_build(resolve);
				}

			}catch(e){

				reject(e);
			}
			
		});
		
	}
	striptags(){

		var v = this.pageData.replace(/\s\s+/g, ' ').replace(/\n/g, "");//remove white-space
		var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;//extract body content
		var matches = pattern.exec(v);
		v = matches !== null ? matches[1] : v;
		var pattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;//remove all scripts
		var v = v.replace(pattern, '');
		this.pageData = striptags(v, this.template.keep_tags);//remove tags
	}
	templatize(){
		let counter = 0, prev = 0, end = false, next=Math.min(this.template.charBreak, this.pageData.length);
		for(let idx=Math.min(this.template.charBreak, this.pageData.length); end===false && this.pageData.length > 0;idx+=this.template.charBreak){
			if(this.template.colCount > 0 && counter % this.template.colCount === 0){
				if(counter > 0){
					this.html += '</'+this.template.outerElm.elmType+'>';
				}
				if(counter < this.pageData.length / this.template.charBreak){
					this.html += '<'+this.template.outerElm.elmType+' class='+this.template.outerElm.className+'>';

				}
			}
			next = Math.min(idx, this.pageData.length);
			//next = this.charCheck(next); todo fix
			next = this.tagcheck(next, '<a', '</a>');
			next = this.tagcheck(next, '<img', '>');
			this.html += '<'+this.template.innerElm.elmType + ' class="'+this.template.innerElm.className+'">' + this.pageData.substring(prev, next) + '</'+this.template.innerElm.elmType+'>';
			prev = next;
			end = idx >= this.pageData.length ? true : false;
			counter++;
		}
		this.html = '<'+this.template.bodyElm.elmType + ' id="'+this.template.bodyElm.idName+'">'+this.html+'</'+this.template.bodyElm.elmType + '>';
	}
	charCheck(pointer){
		let char = this.pageData.charAt(pointer);
		if(char === ' '){
			return char;
		}else{
			let next = this.pageData.indexOf(' ', pointer);
			return next > -1 ? next : pointer;
		}
	}
	tagcheck(pointer, opentag, closetag){
		let prevOpenTag = this.pageData.lastIndexOf(opentag, pointer);
		let prevCloseTag = this.pageData.lastIndexOf(closetag, pointer);
		let nextOpenTag = this.pageData.indexOf(opentag, pointer);
		let nextCloseTag = this.pageData.indexOf(closetag, pointer);
		if(prevOpenTag > prevCloseTag){
			if(nextCloseTag < nextOpenTag || (nextOpenTag===-1 && nextCloseTag>pointer)){
				let next = nextCloseTag + closetag.length;
				return next;
			}
		}
		return pointer;
	}
	stylize(){
		var sheet = this.template.stylesheet;
		this.html += "<style>"+sheet+"</style>";
	}
	loadUrl(){
		let url = this.site;
		return new Promise(function(resolve,reject){
			let body = '';
			request(url)
			.on("data", function(d){
				body += d;
			})
			.on("end", function(){
				resolve(body);
			})
			.on("error", reject);

		});
	}
	isValidUrl(str){
			var pattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			  if(!pattern.test(str)) {
			    return false;
			  } else {
			    return true;
			  }
	}
}
module.exports = HTMLing;