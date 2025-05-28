import obtenerRol from '../../../obtenerRol.js';
import aplicarRestriccionesPorRol from '../../../aplicarRestriccionesPorRol.js';
import logout from '../../../logout.js';

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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el login');
        }

        const data = await response.json();
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Login exitoso. Token almacenado:', data.token);
            
            // Obtener y guardar el rol del usuario después del login
            const user = await obtenerRol();
            if (user) {
                localStorage.setItem('userRole', user.role.toLowerCase());
                console.log(user.role)
            }
            
            return user; // Devolver el usuario para usar en la inicialización
        } else {
            throw new Error('El servidor no devolvió un token');
        }
    } catch (error) {
        console.error('Error en login forzado:', error);
        alert(`Error al hacer login: ${error.message}`);
        throw error; // Relanzar el error para manejarlo fuera
    }
}


// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await loginForzado();
        
        if (user) {
            aplicarRestriccionesPorRol();
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    logout();
                });
            }
        }
    } catch (error) {
        console.error('Error inicializando aplicación:', error);
        // Redirigir a login si hay error de autenticación
        // window.location.href = 'login.html';
    }
});