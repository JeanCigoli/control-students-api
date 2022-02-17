import { HttpRequest, HttpResponse } from './http';

export interface Controller {
  handle: (httpRequest: Controller.Request) => Controller.Response;
}

export namespace Controller {
  export type Request = HttpRequest;

  export type Response = Promise<HttpResponse>;
}
