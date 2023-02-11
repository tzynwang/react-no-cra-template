/* Packages */
const dotenv = require('dotenv');
require('dotenv').config();

/* Data */
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const rawEnv = Object.keys(process.env).reduce(
  (env, key) => {
    env[key] = process.env[key] || '';
    return env;
  },
  {
    NODE_ENV: process.env.NODE_ENV,
  }
);
const env = {
  'process.env': Object.keys(process.env).reduce((env, key) => {
    env[key] = JSON.stringify(rawEnv[key]);
    return env;
  }, {}),
};

module.exports = env;
