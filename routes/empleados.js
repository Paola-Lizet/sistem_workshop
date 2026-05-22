const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Define tus rutas aquí
router.get("/", async (req, res) => {
    // Lógica temporal para probar
    res.status(200).json({ message: "Ruta de empleados funcionando" });
});

// ESTO ES LO QUE ESTÁ FALTANDO SI TE DA ERROR:
module.exports = router;