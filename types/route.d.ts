import * as http from 'http'
import * as http2 from 'http2'
import * as https from 'https'
import { ParsedUrlQuery } from 'querystring'

import { FastifyInstance } from './instance'
import { FastifyMiddleware, FastifyMiddlewareWithPayload } from './middleware'
import { FastifyRequest } from './request'
import { FastifyReply } from './reply'
import { FastifySchema, FastifySchemaCompiler } from './schema'
import { HTTPMethods, RawServerBase, RawServerDefault, RawRequestBase, RawRequestDefault, RawReplyBase, RawReplyDefault, RequestBodyDefault, RequestQuerystringDefault, RequestParamsDefault, RequestHeadersDefault, ContextConfigDefault } from './utils'
import { LogLevels } from './logger'
import { FastifyContext } from './context';
/**
 * Fastify Router Shorthand method type that is similar to the Express/Restify approach
 */
export interface RouteShorthandMethod<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestBase = RawRequestDefault<RawServer>, 
  RawReply extends RawReplyBase = RawReplyDefault<RawServer>,
> {
  <RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>(
    path: string,
    opts: RouteShorthandOptions<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>,
    handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>
  ): FastifyInstance<RawServer, RawRequest, RawReply>
}

/**
 * Fastify Router Shorthand method type that is similar to the Express/Restify approach
 */
export interface RouteShorthandMethod<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestBase = RawRequestDefault<RawServer>, 
  RawReply extends RawReplyBase = RawReplyDefault<RawServer>,
> {
  <RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>(
    path: string,
    handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>
  ): FastifyInstance<RawServer, RawRequest, RawReply>
}

/**
 * Fastify Router Shorthand method type that is similar to the Express/Restify approach
 */
export interface RouteShorthandMethod<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestBase = RawRequestDefault<RawServer>, 
  RawReply extends RawReplyBase = RawReplyDefault<RawServer>,
> {
  <RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>(
    path: string,
    opts: RouteShorthandOptionsWithHandler<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>
  ): FastifyInstance<RawServer, RawRequest, RawReply>
}

/**
 * Route shorthand options for the various shorthand methods
 */
export interface RouteShorthandOptions<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestBase = RawRequestDefault<RawServer>,
  RawReply extends RawReplyBase = RawReplyDefault<RawServer>,
  RequestBody = RequestBodyDefault,
  RequestQuerystring = RequestQuerystringDefault,
  RequestParams = RequestParamsDefault,
  RequestHeaders = RequestHeadersDefault,
  ContextConfig = ContextConfigDefault
> {
  schema?: FastifySchema,
  attachValidation?: boolean,
  preValidation?: FastifyMiddleware<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders> | FastifyMiddleware<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders>[],
  preHandler?: FastifyMiddleware<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders> | FastifyMiddleware<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders>[],
  preSerialization?: FastifyMiddlewareWithPayload<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders> | FastifyMiddlewareWithPayload<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders>[],
  schemaCompiler?: FastifySchemaCompiler,
  bodyLimit?: number,
  logLevel?: LogLevels,
  config?: ContextConfig,
  version?: string,
  prefixTrailingSlash?: boolean
}

/**
 * Fastify route method options. 
 */
export interface RouteOptions<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestBase = RawRequestDefault<RawServer>,
  RawReply extends RawReplyBase = RawReplyDefault<RawServer>,
  RequestBody = RequestBodyDefault,
  RequestQuerystring = RequestQuerystringDefault,
  RequestParams = RequestParamsDefault,
  RequestHeaders = RequestHeadersDefault,
  ContextConfig = ContextConfigDefault
> extends RouteShorthandOptions<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig> {
  method: HTTPMethods | HTTPMethods[],
  url: string,
  handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>,
}

/**
 * Shorthand options including the handler function property
 */
export interface RouteShorthandOptionsWithHandler<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestBase = RawRequestDefault<RawServer>, 
  RawReply extends RawReplyBase = RawReplyDefault<RawServer>,
  RequestBody = RequestBodyDefault,
  RequestQuerystring = RequestQuerystringDefault,
  RequestParams = RequestParamsDefault,
  RequestHeaders = RequestHeadersDefault,
  ContextConfig = ContextConfigDefault
> extends RouteShorthandOptions<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig> {
  handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestBody, RequestQuerystring, RequestParams, RequestHeaders, ContextConfig>
}

/**
 * Route handler method declaration.
 */
export type RouteHandlerMethod<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestBase = RawRequestDefault<RawServer>,
  RawReply extends RawReplyBase = RawReplyDefault<RawServer>,
  RequestBody = RequestBodyDefault,
  RequestQuerystring = RequestQuerystringDefault,
  RequestParams = RequestParamsDefault,
  RequestHeaders = RequestHeadersDefault,
  ContextConfig = ContextConfigDefault
> = (
  request: FastifyRequest<RawServer, RawRequest, RequestBody, RequestQuerystring, RequestParams, RequestHeaders>,
  reply: FastifyReply<RawServer, RawReply, ContextConfig>
) => void | Promise<any>