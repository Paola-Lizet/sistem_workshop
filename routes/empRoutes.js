const express = require('express');
const router = express.Router();
const empController = require('../controllers/empController');
const verificarJWT = require('../middleware/auth'); 

//Búsqueda de empleados
router.get('/buscar', verificarJWT, empController.buscarEmpleadoPorNombre);

//Adquisición de empleados
router.get('/', verificarJWT, empController.obtenerEmpleados);

//Nuevo empleado
router.post('/', verificarJWT, empController.crearEmpleado);

//Modificación de datos de un empleado
router.put('/:id', verificarJWT, empController.actualizarEmpleado);

//Eliminación de un empleado
router.delete('/:id', verificarJWT, empController.eliminarEmpleado);

module.exports = router;