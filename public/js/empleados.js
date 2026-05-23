//Verificación del login
const token = localStorage.getItem('token');
if (!token) {
    alert("Acceso denegado. Por favor, inicia sesión primero.");
    window.location.href = 'index.html'; 
}

const API_URL = '/empleados'; 

//Elementos del DOM
const tablaEmpleados = document.getElementById('tablaEmpleados');
const formEmpleado = document.getElementById('formEmpleado');
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');

document.addEventListener('DOMContentLoaded', obtenerEmpleados);

async function obtenerEmpleados() {
    try {
        const res = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.status === 401) {
            cerrarSesionInvalida();
            return;
        }

        const empleados = await res.json();
        renderTabla(empleados);
    } catch (error) {
        console.error("Error al obtener empleados:", error);
    }
}

function renderTabla(empleados) {
    tablaEmpleados.innerHTML = '';

    if (empleados.length === 0) {
        tablaEmpleados.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No hay empleados registrados.</td></tr>`;
        return;
    }

    empleados.forEach(emp => {
        tablaEmpleados.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.nombre}</td>
                <td>${emp.apellidos}</td>
                <td>${emp.telefono || 'N/A'}</td>
                <td>${emp.correo}</td>
                <td>${emp.direccion || 'N/A'}</td>
                <td class="text-center">
                    <button class="btn btn-danger btn-sm" onclick="eliminarEmpleado(${emp.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

formEmpleado.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoEmpleado = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        direccion: document.getElementById('direccion').value
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(nuevoEmpleado)
        });

        const data = await res.json();
        alert(data.message);

        if (res.status === 201) {
            formEmpleado.reset(); 
            obtenerEmpleados();   
        }
    } catch (error) {
        console.error("Error al crear empleado:", error);
    }
});

btnBuscar.addEventListener('click', async () => {
    const nombreBuscar = inputBuscar.value.trim();
    if (!nombreBuscar) {
        obtenerEmpleados();
        return;
    }

    try {
        const res = await fetch(`${API_URL}/buscar?nombre=${nombreBuscar}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const empleados = await res.json();
        renderTabla(empleados);
    } catch (error) {
        console.error("Error al buscar:", error);
    }
});

window.eliminarEmpleado = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este empleado?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        alert(data.message);
        obtenerEmpleados(); 
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
};


btnCerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

function cerrarSesionInvalida() {
    alert("Tu sesión ha expirado o el token es inválido.");
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}