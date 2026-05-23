const db = require('../config/db');

//Adquirir empleados 
const obtenerEmpleados = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM empleados');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los empleados", error });
    }
};

//Búsqueda de empleados 
const buscarEmpleadoPorNombre = async (req, res) => {
    const { nombre } = req.query; // Captura el nombre desde la URL: /api/empleados/buscar?nombre=Paola
    if (!nombre) {
        return res.status(400).json({ message: "Por favor, proporciona un nombre para buscar." });
    }
    try {
        const [rows] = await db.query('SELECT * FROM empleados WHERE nombre LIKE ?', [`%${nombre}%`]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el empleado", error });
    }
};

//Creación de un nuevo empleado
const crearEmpleado = async (req, res) => {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;
    
    if (!nombre || !apellidos || !correo) {
        return res.status(400).json({ message: "Nombre, apellidos y correo son obligatorios." });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellidos, telefono, correo, direccion]
        );
        res.status(201).json({ message: "Empleado agregado con éxito", id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el empleado", error });
    }
};

//Modificación de datos de un empleado
const actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE empleados SET nombre = ?, apellidos = ?, telefono = ?, correo = ?, direccion = ? WHERE id = ?',
            [nombre, apellidos, telefono, correo, direccion, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado." });
        }
        res.json({ message: "Datos del empleado actualizados correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al modificar el empleado", error });
    }
};

//Eliminación de un empleado
const eliminarEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM empleados WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado." });
        }
        res.json({ message: "Empleado eliminado de la base de datos con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el empleado", error });
    }
};

//Exportación de funciones para ocuparlas en rutas 
module.exports = {
    obtenerEmpleados,
    buscarEmpleadoPorNombre,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
};