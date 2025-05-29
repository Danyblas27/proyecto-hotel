import { inicializarFormularioReservacion } from './navegacion.js';
import aplicarRestriccionesPorRol from '../../../aplicarRestriccionesPorRol.js';
import Auth from '../../../classes/Auth.js';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await Auth.profile();
        
        if (user) {
            aplicarRestriccionesPorRol(user);
            inicializarFormularioReservacion();
        }
    } catch (error) {
        console.error('Error inicializando aplicación:', error);
        // Redirigir a login si hay error de autenticación
        // window.location.href = 'login.html';
    }
    });