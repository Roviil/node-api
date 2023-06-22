var mysql = require('mysql');
const db = mysql.createPool({
    host : 'localhost',
    user : 'hnuce',
    password : 'Zjavbxjrhdgkrrhk1!',
    database : 'Capstone'
});

module.exports = db;