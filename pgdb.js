// MÓDULOS
const dotenv = require('dotenv');
const pg = require('pg');
const { Pool } = pg;

dotenv.config({ path: '.env' });

// DATOS PARA CONECCIÓN LOCAL A POSTGRESQL
let localPoolConfig = {
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: '5432',
    database: 'jobsapp',
};

// CONFIG PARA CONECTARSE A PG DE FORMA LOCAL O EN LA NUBE
const poolConfig = process.env.DATABASE_PG_URL
    ? {
          connectionString: process.env.DATABASE_PG_URL,
          ssl: { rejectUnauthorized: false },
      }
    : localPoolConfig;

const pool = new Pool(poolConfig);

// EXPORTAR MÓDULO POOL
module.exports = pool;
