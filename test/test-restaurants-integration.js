global.DATABASE_URL = 'mongodb://admin:admin@ds127982.mlab.com:27982/final-capstone-yoda-quotes';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Activity = require('../models/activity.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('node-capstone-find-register-events', function() {
    before(function(done) {
        server.runServer(function() {
            Activity.create({
                name: 'Fun Run'
            }, {
                name: 'Run Event'
            }, {
                name: 'Color Run'
            }, function() {
                done();
            });
        });
    });

    describe('node-capstone-find-register-events', function() {

        it('should list activities on GET', function(done) {
            chai.request(app)
                .get('/activity/running')
                .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                // res.body.should.be.a('array');
                // res.body.should.have.length(3);
                // res.body[0].should.be.a('object');
                // res.body[0].should.have.property('_id');
                // res.body[0].should.have.property('name');
                // res.body[0]._id.should.be.a('string');
                // res.body[0].name.should.be.a('string');
                // res.body[0].name.should.equal('Fun Run');
                // res.body[1].name.should.equal('Run Event');
                // res.body[2].name.should.equal('Color Run');
                done();
            });
        });
        it('should add an activity on POST', function(done) {
            chai.request(app)
                .post('/add-to-favorites')
                .send({
                'name': 'Jogger'
            })
                .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Jogger');
                done();
            });
        });

        it('should delete an item on DELETE', function(done) {
            chai.request(app)
                .delete('/')
                .end(function(err, res) {
                res.should.have.status(404);
                done();
            });
        });

    });


    after(function(done) {
        Activity.remove(function() {
            done();
        });
    });
});
