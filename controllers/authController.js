const db = require('../config/db'); 
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { user, password } = req.body;

    try {
        if (!user || !password) {
            return res.status(400).json({ 
                code: 400, 
                message: "Campos incompletos. Se requiere usuario y contraseña." 
            });
        }
        //Buscar al usuario
        const [rows] = await db.query('SELECT * FROM user WHERE user = ? AND password = ?', [user, password]);

        if (rows.length === 0) {
            return res.status(401).json({ 
                code: 401, 
                message: "Usuario o contraseña incorrectos" 
            });
        }
        const usuarioEncontrado = rows[0];

        //Generar el Token
        const token = jwt.sign(
            { 
                id: usuarioEncontrado.id, 
                user: usuarioEncontrado.user 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // El candado expira en una hora
        );

        //Responder con éxito y mandar el token al cliente
        return res.status(200).json({
            code: 200,
            message: "¡Inicio de sesión exitoso!",
            token: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            code: 500, 
            message: "Error interno del servidor al intentar loguear" 
        });
    }
};