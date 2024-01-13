const { Client } = require('pg');
const {config} = require('../config/config')

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`

async function getConnection(){
  const client = new Client({ connectionString: URI})

  await client.connect();
  return client;
}

module.exports = getConnection;
