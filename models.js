var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }
});

var Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
