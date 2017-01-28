const Joi = require('joi')
const Boom = require('boom')
const Config = require('../config/config')
const Crypto = require('crypto');
const Shorturl = require('../model/shorturl').Shorturl

exports.create = {
    validate: {
        payload: {
            url: Joi.string().regex(/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).required()
        }
    },
    handler: function(request, reply) {
      var short = ''
      const baseUrl = request.connection.info.protocol + '://' + request.info.host + '/'

      do{
          short = baseUrl + random(6)
      }while(alreadyExist(short))

      Shorturl.save(short, request.payload.url, function(err, shorturl) {
          if (!err) {
              reply(shorturl);
          } else {
              if (11000 === err.code || 11001 === err.code) {
                  reply(Boom.forbidden("error happen"))
              } else {
                console.log('A')
                reply(Boom.forbidden(err)) // HTTP 403
              }
          }
      })
    }
}

exports.redirect = {
    handler: function(request, reply) {

        const baseUrl = request.connection.info.protocol + '://' + request.info.host + '/'
        const shortUrl = baseUrl + request.params.short

        Shorturl.find(shortUrl, function(err, shorturl) {
            if (!err) {
                if (shorturl === null){
                  return reply.file('views/404.html').code(404)
                }

                return reply().redirect(shorturl.full)
            } else {
                return reply(Boom.badImplementation(err))
             }
        })
    }
}

function random(length){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function alreadyExist(short){
    Shorturl.find(short, function(err, shorturl){

      if(shorturl){
          return true
      }

      return false
    })
}
