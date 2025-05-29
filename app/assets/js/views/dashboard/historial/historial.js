
import obtenerRol from '../../../obtenerRol.js';
import aplicarRestriccionesPorRol from '../../../aplicarRestriccionesPorRol.js';
import { cargarReservaciones } from './verReservaciones.js';
import Auth from '../../../classes/Auth.js';



// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    try {
    
        const user = await Auth.profile();
        

        if (user) {
            aplicarRestriccionesPorRol(user);
            cargarReservaciones();
            // const logoutBtn = document.getElementById('logoutBtn');
            // if (logoutBtn) {
            //     logoutBtn.addEventListener('click', async () => {
            //         await logout();
            //     });
            // }
        }
    } catch (error) {
        console.error('Error inicializando aplicación:', error);
        // Redirigir a login si hay error de autenticación
        // window.location.href = 'login.html';
    }
});