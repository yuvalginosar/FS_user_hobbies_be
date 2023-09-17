import  pkg from 'pg';
import { config } from 'dotenv';

const {Pool} = pkg
config();

const poolObj = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { 
    rejectUnauthorized: false,
    require: true 
  },
}

export const pool = new Pool(poolObj);
