import { HttpRequest, HttpResponse } from './http';

export interface Middleware {
  handle: (...params: Middleware.Params) => Middleware.Result;
}

export namespace Middleware {
  export type Params = [httpRequest: HttpRequest, next: Function];
  export type Result = Promise<HttpResponse>;
}
