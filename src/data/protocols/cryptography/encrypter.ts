export interface Encrypt {
  encrypt: (params: Encrypt.Params) => Encrypt.Result;
}

export namespace Encrypt {
  export type Params = { [value: string]: any };

  export type Result = string;
}
