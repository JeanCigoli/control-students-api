import fs from 'fs';
import path from 'path';
import { formatDate } from './date';

const errorLogger = (error: any) => {
  const date = formatDate(new Date(), 'yyyy-MM-dd');

  const pathError = path.resolve('log', 'error', `${date}.log`);

  const stringError = `------------------------------------------------
Date: ${date}
Error: ${error?.name}: ${error?.message} at ${error?.stack}
`;

  fs.appendFile(pathError, stringError, (errorLog) => {
    if (errorLog) throw errorLog;
  });
};

export default errorLogger;
