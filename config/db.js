const Mongoose = require('mongoose')
const config = require('./config')

var mongoUri = 'mongodb://' + config.database

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongoUri = process.env.OPENSHIFT_MONGODB_DB_URL
}

Mongoose.connect(mongoUri);
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
