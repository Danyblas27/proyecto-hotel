export function inicializarCrearUsuario() {
    const form = document.getElementById('createUserForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Limpiar errores
        limpiarErrores();

        // Obtener valores
        const name = form.elements['createName'].value.trim();
        const email = form.elements['createEmail'].value.trim();
        const password = form.elements['createPassword'].value;
        const role = form.elements['createRole'].value;

        // Validaciones básicas
        if (!validarFormulario(name, email, password, role)) return;

        try {
            const token = localStorage.getItem('token'); // Obtener token de autenticación
            const response = await fetch('http://localhost:3000/api/users/create', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuario creado exitosamente');
                form.reset();
                document.dispatchEvent(new CustomEvent('usuariosActualizados'));
            } else {
                mostrarError(data.message || 'Error al crear usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    });

    function limpiarErrores() {
        document.getElementById('errorCreateName').textContent = '';
        document.getElementById('errorCreateEmail').textContent = '';
        document.getElementById('errorCreatePassword').textContent = '';
        document.getElementById('errorCreateRole').textContent = '';
    }

    function validarFormulario(name, email, password, role) {
        let valido = true;

        if (name.length < 3) {
            document.getElementById('errorCreateName').textContent = 'Nombre muy corto (mín. 3 caracteres)';
            valido = false;
        }

        if (!email.includes('@') || !email.includes('.')) {
            document.getElementById('errorCreateEmail').textContent = 'Correo electrónico inválido';
            valido = false;
        }

        if (password.length < 8) {
            document.getElementById('errorCreatePassword').textContent = 'Contraseña muy corta (mín. 8 caracteres)';
            valido = false;
        }

        if (!role) {
            document.getElementById('errorCreateRole').textContent = 'Selecciona un rol';
            valido = false;
        }

        return valido;
    }

    function mostrarError(mensaje) {
        alert(`Error: ${mensaje}`);
    }
}