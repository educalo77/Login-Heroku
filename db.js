const Pool = require("pg").Pool;
const pool = new Pool ({
    user: "postgres",
    password: "Ami16Azu04",
    host: "localhost",
    port: 5432,
    database: "jwtauth"
});

module.exports = pool;