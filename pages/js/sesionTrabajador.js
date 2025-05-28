export function iniciarSesionTrabajador() {
    const form = document.getElementById('formularioLogin');
    if (!form) return;


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.elements['email'].value.trim();
        const password = form.elements['password'].value;


        const dataJob = {
            email: email,
            password: password
        }

        limpiarErrores();

        if (!validarFormulario(dataJob)) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(dataJob)

         })

         const data = await response.json();
         //funcion para obtener el rol
         async function obtenerRol() {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token disponible');

                const response = await fetch('http://localhost:3000/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Error al obtener perfil');

                const data = await response.json();
                return data.user;
            } catch (error) {
                console.error('Error obteniendo rol:', error);
                throw error;
            }
        }

        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Login exitoso. Token almacenado:', data.token);

            alert('Inicio de sesión exitoso');

            window.location.href = 'dashboard.html';


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
    });
}

function limpiarErrores() {

}

function validarFormulario(email, password) {

    return true;
}

function mostrarError(mensaje) {
    alert(`Error: ${mensaje}`);
}