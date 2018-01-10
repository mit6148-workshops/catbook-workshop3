const mongoose = require('mongoose');

// setup mongoDB connection
const mongoURL = "mongodb://robert:qwerty123@dsXXXXXX.mlab.com:XXXXX/catbookdb";
const options = {
    useMongoClient: true
};
mongoose.connet(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// optional connection handling: feedback for us to know that we're connected
db.on('connected', console.log('database connected!'));
module.exports = db;
