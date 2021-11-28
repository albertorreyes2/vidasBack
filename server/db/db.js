const mysql = require('mysql2');

const con = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'sistemUser',
    password: 'sistemUser123*3',
    database: 'vidas_utd',
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