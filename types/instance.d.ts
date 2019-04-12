import * as http from 'http'
import * as http2 from 'http2'
import * as https from 'https'

import { RouteOptions, RouteShorthandIntersection } from './route'
import { FastifySchema } from './schema'
import { RawServerBase, RawRequestBase, RawReplyBase, RawServerDefault, RawRequestDefault, RawReplyDefault } from './utils'
import { FastifyLogger } from './logger'
import { InjectOptions, InjectPayload } from 'light-my-request'
import { FastifyRegister } from './register';

export interface FastifyInstance<
  RawServer extends RawServerBase = RawServerDefault, 
  RawRequest extends RawRequestBase = RawRequestDefault<RawServer>, 
  RawReply extends RawReplyBase = RawReplyDefault<RawServer>
> {
  server: RawServer
  prefix: string
  log: FastifyLogger

  addSchema(schema: FastifySchema): FastifyInstance<RawServer, RawRequest, RawReply>

  after(err: Error): FastifyInstance<RawServer, RawRequest, RawReply>

  close(closeListener?: () => void): void
  close<T>(): Promise<T> // what is this use case? Not documented on Server#close

  // should be able to define something useful with the decorator getter/setter pattern using Generics to enfore the users function returns what they expect it to
  decorate(property: string, value: any, dependencies?: Array<string>): FastifyInstance<RawServer, RawRequest, RawReply>
  decorateRequest(property: string, value: any, dependencies?: Array<string>): FastifyInstance<RawServer, RawRequest, RawReply>
  decorateReply(property: string, value: any, dependencies?: Array<string>): FastifyInstance<RawServer, RawRequest, RawReply>

  hasDecorator(decorator: string): boolean
  hasRequestDecorator(decorator: string): boolean
  hasReplyDecorator(decorator: string): boolean

  inject(opts: InjectOptions | string, cb: (err: Error, response: InjectPayload) => void): void
  inject(opts: InjectOptions | string): Promise<InjectPayload>

  listen(port: number, address: string, backlog: number, callback: (err: Error, address: string) => void): void
  listen(port: number, address: string, callback: (err: Error, address: string) => void): void
  listen(port: number, callback: (err: Error, address: string) => void): void
  listen(port: number, address?: string, backlog?: number): Promise<string>

  ready(): Promise<FastifyInstance<RawServer, RawRequest, RawReply>>
  ready(readyListener: (err: Error) => void): void

  register: FastifyRegister<RawServer, RawRequest, RawReply>
  use: FastifyRegister<RawServer, RawRequest, RawReply>

  route(opts?: RouteOptions<RawServer, RawRequest, RawReply>): FastifyInstance<RawServer, RawRequest, RawReply>

  // Would love to implement something like the following:
  // [key in RouteMethodsLower]: RouteShorthandMethod<RawServer, RawRequest, RawReply> | RouteShorthandMethodWithOptions<RawServer, RawRequest, RawReply>,

  get: RouteShorthandIntersection<RawServer, RawRequest, RawReply>
  head: RouteShorthandIntersection<RawServer, RawRequest, RawReply>
  post: RouteShorthandIntersection<RawServer, RawRequest, RawReply>
  put: RouteShorthandIntersection<RawServer, RawRequest, RawReply>
  delete: RouteShorthandIntersection<RawServer, RawRequest, RawReply>
  options: RouteShorthandIntersection<RawServer, RawRequest, RawReply>
  patch: RouteShorthandIntersection<RawServer, RawRequest, RawReply>
  all: RouteShorthandIntersection<RawServer, RawRequest, RawReply>
}
