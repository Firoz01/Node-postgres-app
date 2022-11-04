const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restaurant',
  password: '01925741193',
  port: 5432,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
