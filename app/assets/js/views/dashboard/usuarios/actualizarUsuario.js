let usuarioSeleccionado = null;

export function inicializarEditarUsuario() {
    const form = document.getElementById('editUserForm');
    if (!form) return;

    form.addEventListener('submit', editarUsuario);

    // Escuchar evento para editar desde tabla
    document.addEventListener('editarDesdeTabla', (e) => {
        usuarioSeleccionado = e.detail;
        cargarUsuarioParaEditar(usuarioSeleccionado);
    });

    // Botón cancelar
    document.getElementById('cancelEditBtn')?.addEventListener('click', () => {
        form.reset();
        document.getElementById('editUserFormFields').classList.add('d-none');
    });
}

async function cargarUsuarioParaEditar(userId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Debes iniciar sesión primero');
        }

        // Obtener todos los usuarios
        const response = await fetch('http://localhost:3000/api/users/show', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const usuarios = Array.isArray(data) ? data : data.users || data.data || [];

        // Buscar el usuario específico
        const user = usuarios.find(u => u.id === userId);

        if (!user) {
            throw new Error('Usuario no encontrado en los registros');
        }

        // Llenar el formulario
        document.getElementById('editUserId').value = user.id || user._id;
        document.getElementById('editName').value = user.name || '';
        
        // Campo email readonly
        const emailInput = document.getElementById('editEmail');
        emailInput.value = user.email || '';
        emailInput.readOnly = true;
        
        // Mostrar rol readonly
        const roleInput = document.getElementById('editRole');
        roleInput.value = user.role || '';
        roleInput.readOnly = true;
        
        // Mostrar el formulario
        document.getElementById('editUserFormFields').classList.remove('d-none');

    } catch (error) {
        console.error('Error al cargar usuario:', error);
        alert(error.message);
        if (error.message.includes('sesión')) {
            window.location.href = '/login.html';
        }
    }
}

async function editarUsuario(e) {
    e.preventDefault();

    if (!usuarioSeleccionado) {
        alert('Primero selecciona un usuario');
        return;
    }

    const form = e.target;
    const email = document.getElementById('editEmail').value.trim();
    const role = document.getElementById('editRole').value;
    
    const datos = {
        name: form.elements['editName'].value.trim(),
        email: email,
        role: role
    };

    if (!datos.name) {
        alert('El nombre es obligatorio');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await fetch(`http://localhost:3000/api/users/edit/${usuarioSeleccionado}`, {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Nombre de usuario actualizado correctamente');
            form.reset();
            document.getElementById('editUserFormFields').classList.add('d-none');
            document.dispatchEvent(new CustomEvent('usuariosActualizados'));
        } else {
            alert(`Error: ${result.message || 'No se pudo actualizar el usuario'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor: ' + error.message);
    }
}