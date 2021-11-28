const mysql = require('mysql2');

const con = mysql.createPool({
    connectionLimit: 50,
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE ,
});

con.query("SELECT 1", (err, result) => { })
// Attempt to catch disconnects 
con.on('connection', function (connection) {
    console.log('MySQL online');
    connection.on('error', function (err) {
        console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
        console.error(new Date(), 'MySQL close', err);
    });
});

module.exports = con;