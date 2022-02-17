export function makeError(param: string, message: string) {
  return [
    {
      message,
      param,
    },
  ];
}
