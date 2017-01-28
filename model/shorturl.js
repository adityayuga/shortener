const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db').db;

/**
 * @module  Shorturl
 * @description contain the details of Attribute
 */

var Shorturl = new Schema({

    short: {
        type: String,
        unique: true,
        required: true
    },

    full: {
        type: String,
        required: true
    },

    created_at: {
      type: Date,
      default: Date.now
    }
})

Shorturl.statics.save = function(short, full, callback) {
    var query = {
      short : short,
      full : full
    }

    this.create(query, callback)
}

Shorturl.statics.find = function(short, callback) {
    this.findOne({
        short: short
    }, callback)
}

var shorturl = mongoose.model('shorturl', Shorturl)

/** export schema */
module.exports = {
    Shorturl: shorturl
}
