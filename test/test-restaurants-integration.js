global.DATABASE_URL = 'mongodb://admin:admin@ds127982.mlab.com:27982/final-capstone-yoda-quotes';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Quote = require('../models.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

var quoteToTest = "I shall not waste my days in trying to prolong them";

describe('final-capstone-yoda-quotes', function () {
    before(function (done) {
        server.runServer(function () {
            Quote.create({
                name: 'I went to the store today.'
            }, {
                name: 'I ran a mile yesterday.'
            }, {
                name: 'They call me hockey master.'
            }, function () {
                done();
            });
        });
    });

    describe('final-capstone-yoda-quotes', function () {

        it('should list quotes on GET', function (done) {
            chai.request(app)
                .get('/yoda-quote/')
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
        it('should add a quote on POST', function (done) {
            chai.request(app)
                .post('/favorite-quote')
                .send({
                    'name': quoteToTest
                })
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('_id');
                    res.body.name.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.name.should.equal(quoteToTest);
                    done();
                });
        });

        it('should delete a quote on DELETE', function (done) {
            chai.request(app)
                .delete('/delete-favorites')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });

    });


    after(function (done) {
        Quote.remove(function () {
            done();
        });
    });
});
