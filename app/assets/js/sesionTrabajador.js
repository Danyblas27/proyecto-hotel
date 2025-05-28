export function iniciarSesionTrabajador() {
    const form = document.getElementById('formularioLogin');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        limpiarErrores();

        const email = form.elements['email'].value.trim();
        const password = form.elements['password'].value;

        if (!validarFormulario(email, password)) {
            mostrarError("Correo y contraseña son obligatorios.");
            return;
        }

        const datos = { email, password };

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
                body: JSON.stringify(datos)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Credenciales inválidas');
            }

            localStorage.setItem('token', response.token); 

            alert('Inicio de sesión exitoso');
            window.location.href = '../app/views/pages/dashboard/dashboard.html';
        } catch (error) {
            console.error('Error en inicio de sesión:', error);
            mostrarError(error.message);
        }
    });
}

async function obtenerPerfilUsuario() {
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

function limpiarErrores() {
    // Si usas inputs con clases de error, puedes limpiar aquí
    // document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}

function validarFormulario(email, password) {
    return email !== '' && password !== '';
}

function mostrarError(mensaje) {
    alert(`Error: ${mensaje}`);
}
