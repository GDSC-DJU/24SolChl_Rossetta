const mysql = require('mysql2/promise')

exports.pool = mysql.createPool({
    host: '34.64.40.226',
    user: 'root',
    password: process.env.DB_SECRET,
    database: 'rossetta_DB_V1',
    port:'3306',
    // connectionLimit : 30,
})
