import { iniciarSesionTrabajador} from './sesionTrabajador.js';
import { iniciarCrearTrabajador } from './crearTrabajador.js';
// linea 5 a la 22 nuevo creado
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');

    // Inicializar módulos según la página actual
    if (document.getElementById('formularioLogin')) {
        iniciarSesionTrabajador();
    }

    if (document.getElementById('formularioRegistro')) {
        iniciarCrearTrabajador();
    }
});

async function LoginTrabajador() {
    try {
        await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            credentials: 'include'
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el login');
        }
        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Login exitoso. Token almacenado:', data.token);
        } else {
            console.error('El servidor no ha devolvido uan respuesta');
        }
    } catch (error) {
        console.error('Error en login forzado:', error);
        alert(`Error al hacer login: ${error.message}`);
    }
}

/*
async function loginForzado() {
    try {
        await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });

        // 3. Manejar posibles errores
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el login');
        }

        // 4. Procesar respuesta exitosa
        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Login exitoso. Token almacenado:', data.token);
            cargarUsuarios();
        } else {
            console.error('El servidor no devolvió un token');
        }
    } catch (error) {
        console.error('Error en login forzado:', error);
        alert(`Error al hacer login: ${error.message}`);
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Ejecutar el login forzado al cargar la página
    loginForzado().then(() => {
        inicializarCrearUsuario();
        inicializarEditarUsuario();
        inicializarEliminarUsuario();

        document.addEventListener('usuariosActualizados', cargarUsuarios);
    });
});

*/
