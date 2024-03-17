const mysql = require('mysql2/promise')

exports.pool = mysql.createPool({
    host: '35.216.81.26',
    user: 'root',
    password: process.env.DB_SECRET,
    database: 'rossetta',
    port:'3306',
    // connectionLimit : 30,
})