/*global describe:true, before:true, after: true, it:true */

'use strict';

var util = require('util')
  , path = require('path')
  , fs = require('fs')
  , settings = require('yaml-config').readConfig(path.join(__dirname, '..', 'config.yaml'), 'default')
  , should = require('chai').should()
  , request = require('supertest')
  , url = 'http://localhost:' + settings.server.port;


describe("\n\n================\nROUTE TEST PARTY\n================\n\n", function () {

  before(function (done) {
  //uncomment to start server
  //var server = require('../server');
  setTimeout(function() {
      request(url)
          .get('/')
          .expect(200)
          .end(function (err, res) {
            if (err) {
              if (err.code === 'ECONNREFUSED') return done(new Error('Server is not running.'));
              return done(err);
            }
            return done();
          });
    }, 500);
  });

  it('should return an /htmling formatted response', function (done) {
    request(url)
          .post('/htmling')
          .type('form')
          .send({'template': 'default', 'blob':'testing, <script>var null;</script><a href="">testing</a> 123'})
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            var resp = res.body;
            resp.should.be.an('object');
            resp.html.should.be.an('string');
            resp.script.should.be.an('string');
            return done();
          });
  });

});