const Mongoose = require('mongoose')
const config = require('./config')

const mongoUri = process.env.MONGOURI || 'mongodb://' + config.database.host + '/' + config.database.db;

Mongoose.connect(mongoUri);
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
