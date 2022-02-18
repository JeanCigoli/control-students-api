export interface AuthenticationByCredentials {
  auth(
    params: AuthenticationByCredentials.Params,
  ): AuthenticationByCredentials.Result;
}

export namespace AuthenticationByCredentials {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = Promise<any>;
}
