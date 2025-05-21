import { inicializarCrearServicio } from './servicios/crearServicio.js';
import { cargarServicios } from './servicios/listarServicios.js';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    inicializarCrearServicio();
    cargarServicios();
    
});