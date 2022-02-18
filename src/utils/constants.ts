import 'dotenv/config';

export const SERVER = {
  PORT: process.env.PORT || 3355,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BASE_URI: process.env.BASE_URI || '',
};

export const DATABASE = {
  NAME: process.env.DATABASE_NAME || '',
  DIALECT: process.env.DATABASE_DIALECT || 'mysql',
  HOST: process.env.DATABASE_HOST || '',
  USERNAME: process.env.DATABASE_USERNAME || '',
  PASSWORD: process.env.DATABASE_PASSWORD || '',
  PORT: process.env.DATABASE_PORT || 3306,
};

export const ENCRYPTION = {
  KEY: process.env.ENCRYPTION_KEY || '',
  IV: process.env.ENCRYPTION_IV || '',
};
