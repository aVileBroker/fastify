# Fastify

## module.exports

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

## .listen(port, [address,] [callback])
Starts the server on the given port after all the plugins are loaded, internally waits for the .ready() event. The callback is the same as the Node core.

## ready([callback])
Function called when all the plugins have been loaded. Returns a `Promise` if no callback is specified. 

## route(options)