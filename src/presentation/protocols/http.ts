export interface HttpRequest {
  headers?: any;
  body?: any;
  query?: any;
  params?: any;
  token: Token;
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
  headers?: any;
}
