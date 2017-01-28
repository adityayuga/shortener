'use strict';

const URL = require('./controller/url')

exports.routes = [
  { method: 'GET', path: '/', handler(request, reply) { reply.file('views/index.html') } },
  { method: 'GET', path: '/public/{file}', handler(request, reply) { reply.file('public/' + request.params.file) } },
  { method: 'POST', path: '/create', config: URL.create},
  { method: 'GET', path: '/{short}', config: URL.redirect}
]
