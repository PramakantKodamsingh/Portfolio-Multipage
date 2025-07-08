/**
 * Configuration Module to complement Nest configuration.
 *
 * @author Pramakant Kodamsingh
 * @date 28-06-2025
 */
require('dotenv').config();

export default () => ({
  PROJECT: 'My Portfolio',

  PORT: parseInt(process.env.PORT || '8888', 10),
  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
  CLIENT_HOST: process.env.CLIENT_HOST || 'https://localhost:8080',

  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXP: process.env.JWT_EXPIRES_IN,
  },

  // CACHE: {
  //   REDIS_URL: process.env.REDIS_URL,
  //   REDIS_TTL: parseInt(process.env.REDIS_TTL || '43200', 10),
  // },

  API: {
    GLOBAL_PREFIX: process.env.API_GLOBAL_PREFIX || 'api',
  },

  DB: {
    TYPE: process.env.PG_TYPE || 'postgres',
    PORT: parseInt(process.env.PG_PORT || '5432', 10),
    HOST: process.env.PG_HOST || 'localhost',
    USERNAME: process.env.PG_USERNAME || 'postgres',
    PASSWORD: process.env.PG_PASSWORD,
    DATABASE: process.env.PG_DATABASE || 'portfolio_db',
    URL: process.env.DB_URL,
  },

  SWAGGER: {
    TITLE: 'Portfolio',
    DESCRIPTION: 'Multipage Portfolio using Next, Nest and Postgres',
    VERSION: '1.0.0',
  },
});
