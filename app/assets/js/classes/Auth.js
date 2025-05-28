import { urlsApi } from "../global/config.js";
import { dashboardRoutes } from "../routes/index.route.js";


const urlsAuth = urlsApi.endpoints.auth;

const Auth = {
    login: async (email, password) => {
        try {
            const response = await fetch(urlsApi.baseURL + urlsAuth.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Credenciales inválidas');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            alert('Inicio de sesión exitoso');
            window.location.href = dashboardRoutes.home;
        } catch (error) {
            console.error('Error en inicio de sesión:', error);
            alert(error.message);
        }
    },

    register: async (name, email, password, role) => {
        try {
            const response = await fetch(urlsApi.baseURL + urlsAuth.register, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear usuario');
            }

            alert('Usuario creado exitosamente');
            window.location.href = dashboardRoutes.login;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert(error.message);
        }
    },

    logout: async () => {

        const response = await fetch(urlsApi.baseURL + urlsAuth.logout, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            console.log('Sesión Cerrada');
        }

        window.location.href = dashboardRoutes.login;
    },

    profile: async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/profile', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('No se pudo obtener el perfil del usuario');

            const data = await response.json();
            return data.user;
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            throw error;
        }
    }
}

export default Auth;