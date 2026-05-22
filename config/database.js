const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // El usuario por defecto de XAMPP/WAMP
    password: '',      // Si usas XAMPP, usualmente es vacío
    database: 'taller_node',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;