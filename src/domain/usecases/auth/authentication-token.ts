export interface AuthenticationToken {
  decrypt(params: AuthenticationToken.Params): AuthenticationToken.Result;
}

export namespace AuthenticationToken {
  export type Params = string;

  export type Result = Token;
}
