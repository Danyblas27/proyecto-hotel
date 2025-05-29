import { inicializarCrearUsuario } from './crearUsuario.js';
import { inicializarEditarUsuario } from './actualizarUsuario.js';
import { inicializarEliminarUsuario } from './eliminarUsuario.js';
import { cargarUsuarios } from './verUsuarios.js';
import aplicarRestriccionesPorRol from '../../../aplicarRestriccionesPorRol.js';
import Auth from '../../../classes/Auth.js';


// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await Auth.profile();
        
        if (user) {
            aplicarRestriccionesPorRol(user);
            inicializarCrearUsuario();
            inicializarEditarUsuario();
            inicializarEliminarUsuario();
            cargarUsuarios();
            document.addEventListener('usuariosActualizados', cargarUsuarios);
        }
    } catch (error) {
        console.error('Error inicializando aplicación:', error);
        // Redirigir a login si hay error de autenticación
        // window.location.href = 'login.html';
    }
});