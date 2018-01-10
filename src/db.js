const mongoose = require('mongoose');

// setup mongoDB connection
const mongoURL = "mongodb://robertv:qwerty123@ds251287.mlab.com:51287/catbookdb"; // make sure to change to your mongoURI
const options = {
    useMongoClient: true
};
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// optional connection handling: feedback for us to know that we're connected
db.on('connected', function() { console.log('database connected!'); });
module.exports = db;
