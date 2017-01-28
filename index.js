'use strict';

const Hapi = require('hapi')
const Db = require('./config/db')
const Config = require('./config/config')
const Routes   = require('./routes')

var app = {};
app.config = Config;

const server = new Hapi.Server()
server.connection({ port: app.config.server.port, host: app.config.server.host })

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, reply) {
    var ip = request.headers['x-forwarded-for'] || request.info.remoteAddress
    console.log(ip, request.method.toUpperCase(), request.path, request.query)

    return reply.continue()
})

server.register(require('inert'), (err) => {

  server.route(Routes.routes)

  server.start(err => {
    if (err){
      throw err
    }

    console.log(`Server running at port ${server.info.port}`)
  })
})
