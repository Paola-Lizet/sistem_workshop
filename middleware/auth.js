const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Extraer el encabezado de autorización de la petición
    const authHeader = req.headers.authorization;

    //VAlidar encabezado y formato
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            code: 401, 
            message: "No tienes permiso: Token no proporcionado :(" 
        });
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "debugkey");
        req.user = decoded;
        next();
    } catch (error) {
        //Si el token es falso, expiró o se alteró
        return res.status(401).json({ 
            code: 401, 
            message: "No tienes permiso: Token inválido o expirado :(" 
        });
    }
};