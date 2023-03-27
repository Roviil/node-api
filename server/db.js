var mysql = require('mysql');
const db = mysql.createPool({
    host : '144.24.87.149',
    user : 'qowjdgns0106',
    password : 'Zjavbxjrhdgkrrhk1!',
    database : 'Capstone'
});

module.exports = db;