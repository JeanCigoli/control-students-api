export interface Decrypt {
  decrypt: (data: string) => Decrypt.Result;
}

export namespace Decrypt {
  export type Result = { [value: string]: any };
}
