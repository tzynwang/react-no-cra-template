/* Packages */
import dotenv from 'dotenv';
require('dotenv').config();

/* Data */
type Env = {
  [key: string]: string;
};

export const isEnvDevelopment = process.env.NODE_ENV === 'development';
export const isEnvProduction = process.env.NODE_ENV === 'production';

const rawEnv = Object.keys(process.env).reduce(
  (env: Env, key) => {
    env[key] = process.env[key] || '';
    return env;
  },
  {
    NODE_ENV: process.env.NODE_ENV,
  }
);
const env = {
  'process.env': Object.keys(process.env).reduce((env: Env, key) => {
    env[key] = JSON.stringify(rawEnv[key]);
    return env;
  }, {}),
};

export default env;
