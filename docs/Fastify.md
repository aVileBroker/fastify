# Fastify

## module.exports

<a id="build"></a>

## .build([options])

### Parameters
- options (object):
  - logger (boolean): Toggles `Logger` utility. Default `false`.
  - http2 (boolean): Toggles experimental HTTP2 features. Default `false`.
  - https (object): 
    - allowHTTP1 (boolean): Toggles `HTTP/1` usage
    - key (string): `HTTPS/2` security key
    - cert (string): `HTTPS/2` security certificate

### Examples
Basic Example
```js
'use strict'
const fastify = require('fastify')()
```
Logger enabled
```js
'use strict'
cosnt fastify = require('fastify')({
  logger: true
})
```

## Server Methods

<a id="listen"></a>

## .listen(port, [address,] [callback])
Starts the server on the given port after all the plugins are loaded, internally waits for the .ready() event. The callback is the same as the Node core.

### Parameters
- port (number): Port to listen for server requests. *Required*
- address (string): URL to listen for server requests. 
- callback (function): Callback function. First parameter is an `error`. If no callback is defined, `.listen` returns a promise.

### Examples
Basic Example
```js
'use strict'
fastify.listen(3000, err => {
  if (err) console.log(err)
  console.log(`server listening on ${fastify.server.address().port}`)
})
```
Specify address
```js
'use strict'
fastify.listen(3000, '127.0.0.1', err => {
  if (err) console.log(err)
  console.log(`server listening on ${fastify.server.address().port}`)
})
```
Without a callback
```js
'use strict'
fastify.listen(3000)
  .then(() => 
    console.log(`server listening on ${fastify.server.address().port}`)
  )
  .catch(err => 
    console.log(err)
  )
```

<a id="ready"></a>

## ready(callback)
Function called when all the plugins have been loaded. Returns a `Promise` if no callback is specified. 

### Parameters
- callback (function): Callback function. First parameter is an `error`. If no callback is defined, `.ready` returns a promise.

### Examples
Callback Example
```js
'use strict'
fastify.ready(err => if (err) console.log(err))
```
Promise Example
```js
'use strict'
fastify.ready()
  .then(() => console.log('Ready to go!'))
  .catch(err => console.log(err))
```

## route(options)
Method to add routes to the server, it also have shorthands functions.

### Parameters
- options (object):
  - method (string|array): currently supports `'DELETE'`, `'GET'`, `'HEAD'`, `'PATCH`', `'POST'`, `'PUT'`, and `'OPTIONS'`. Can also be an array of method strings. *Required*
  - url (string): the path of the url to match this route (alias: `path`). *Required*
  - schema (object): an object containing the schema for the request and response. Needs to be in `JSON` format.
    - body: validates the body of the request if it is a POST or a PUT.
    - querystring: validates the querystring. This can be a complete JSON Schema object, with the property `type` of `object` and `properties` object of parameters, or simply the values of what would be contained in the `properties` object as shown below.
    - params: validates the params
    - reponse: filter and generate a schema for the response. Setting a schema allows us to have 10-20% more throughput.
  - beforeHandler (function|array): A function called just before the request handler. Function signature is `beforeHandler(request, reply, done)`. This may be useful if you need to perform authentication at route level. Can also be an array of functions.
  - handler (function): Function that will handle this request. Function signature is `handler(request, reply)`. *Required*
  - schemaCompiler (function): Function that builds the schema for the validations. Function signature is `schemaCompiler(schema)`.

### Example
```js
fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      name: { type: 'string' },
      excitement: { type: 'integer' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
```
