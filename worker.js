/*global module:true, require:true, console:true, process:true */
'use strict';

var path = require('path'),
    restify = require('restify');
var routes = require('./routes');
exports.createServer = createServer;
var enableCors = true;
function createServer(logger) {

    var config = {
        name: require(path.join(__dirname, 'package')).name
    };

    if (logger) config.log = logger;

    var server = restify.createServer(config);

    if(enableCors){
        server.use(restify.CORS());
        server.opts(/.*/, function (req,res,next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
            res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
            res.send(200);
            return next();
        });

    }
    
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.bodyParser());

    server.on('NotFound', function(req, res, next) {
        if (logger) logger.debug('404', 'Request for ' + req.url + ' not found. No route.');
        res.send(404, req.url + ' was not found');
    });

    if (logger) server.on('after', restify.auditLogger({
        log: logger
    }));
    for(var key in routes){
        var route = '/' + key;
        var handler = routes[key];
        server.post(route, function(req, res, next) {
            handler(req, res, next);
        });
    };

    return server;
}