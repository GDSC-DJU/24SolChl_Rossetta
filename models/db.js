const mysql = require('mysql2/promise')

exports.pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_SECRET,
    database: 'rossetta',
    port:'3306',
    // connectionLimit : 30,
})