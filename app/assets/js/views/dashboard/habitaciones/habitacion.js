import { inicializarCrearHabitacion } from './crearHabitacion.js';
import { mostrarHabitaciones } from './verHabitaciones.js';
import { inicializarEditarHabitacion } from './editarHabitacion.js';
import { inicializarEliminarHabitacion } from './eliminarHabitacion.js';

async function loginForzado() {
    try {
        await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include' 
        });


        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "hrodriguez22@ucol.mx",
                password: "12345678" 
            }),
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
            mostrarHabitaciones();
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
        inicializarCrearHabitacion();
        mostrarHabitaciones();
        inicializarEditarHabitacion();
        inicializarEliminarHabitacion();
        
        document.querySelector('#ver-habitaciones button')?.addEventListener('click', mostrarHabitaciones);
    });
});