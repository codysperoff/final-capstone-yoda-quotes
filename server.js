const unirest = require('unirest');
const events = require('events');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const Quote = require('./models');



const express = require('express');
const morgan = require('morgan');


const {
    BlogPost
} = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.Promise = global.Promise;



// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};
// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance,
//test code) can start the server as needed.
if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};


// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}





// external API call
var getFromYodaSpeak = function (searchTerm) {
    var emitter = new events.EventEmitter();
    unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + searchTerm)
        .header("X-Mashape-Key", "k8mRsliHRomshdTUOoSELbEBhicEp1idX4ejsnpN0qshKyXlUA")
        .header("Accept", "text/plain")
        // .header("Accept", "application/json")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });
    return emitter;
};

// external API call
var getFromFamousQuotes = function (selection, query) {
    var emitter = new events.EventEmitter();
    //console.log("inside getFromActive function");
    unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=" + selection + "&count=" + query)
        .header("X-Mashape-Key", "k8mRsliHRomshdTUOoSELbEBhicEp1idX4ejsnpN0qshKyXlUA")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Accept", "application/json")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });
    return emitter;
};

// local API endpoints
app.get('/yoda-quote/:quote_text', function (request, response) {
    //console.log(request.params.quote_name);
    if (request.params.quote_text == "") {
        response.json("Specify a quote text");
    } else {
        var yodaQuoteDetails = getFromYodaSpeak(request.params.quote_text);

        //get the data from the first api call
        yodaQuoteDetails.on('end', function (item) {
            //            console.log(item);
            response.json(item);
        });

        //error handling
        yodaQuoteDetails.on('error', function (code) {
            response.sendStatus(code);
        });
    }
});

app.get('/search/:selection/:query', function (request, response) {
    console.log(request.params.selection, request.params.query);

    var famousQuoteDetails = getFromFamousQuotes(request.params.selection, request.params.query);

    //get the data from the first api call
    famousQuoteDetails.on('end', function (item) {
        //        console.log(item);
        response.json(item);
    });

    //error handling
    famousQuoteDetails.on('error', function (code) {
        response.sendStatus(code);
    });
});

app.post('/favorite-quote', function (req, res) {
    console.log(req.body.quoteName);
    Quote.create({
        name: req.body.quoteName
    }, function (err, quotes) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(quotes);
    });
});
app.get('/favorite-quotes', function (req, res) {
    Quote.find(function (err, quotes) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(quotes);
    });
});

app.delete('/delete-favorites', function (req, res) {
    Quote.remove(req.params.id, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(200).json(items);
    });
});
app.delete('/delete-one-favorite/:favoritesId', function (req, res) {
    Quote.findByIdAndRemove(req.params.favoritesId, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });
});


exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;

app.listen(8888);


/// test code for travis
