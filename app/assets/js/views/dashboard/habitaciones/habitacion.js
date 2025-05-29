import { inicializarCrearHabitacion } from './crearHabitacion.js';
import { mostrarHabitaciones } from './verHabitaciones.js';
import { inicializarEditarHabitacion } from './editarHabitacion.js';
import { inicializarEliminarHabitacion } from './eliminarHabitacion.js';
import aplicarRestriccionesPorRol from '../../../aplicarRestriccionesPorRol.js';
import Auth from '../../../classes/Auth.js';



// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await Auth.profile();
        
        if (user) {
            aplicarRestriccionesPorRol(user);
            inicializarCrearHabitacion();
            mostrarHabitaciones();
            inicializarEditarHabitacion();
            inicializarEliminarHabitacion();
            // const logoutBtn = document.getElementById('logoutBtn');
            // if (logoutBtn) {
            //     logoutBtn.addEventListener('click', () => {
            //         logout();
            //     });
            // }
            document.querySelector('#ver-habitaciones button')?.addEventListener('click', mostrarHabitaciones);
        }
    } catch (error) {
        console.error('Error inicializando aplicación:', error);
        // Redirigir a login si hay error de autenticación
        // window.location.href = 'login.html';
    }
    });