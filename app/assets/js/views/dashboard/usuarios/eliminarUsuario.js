let usuarioSeleccionado = null;

export function inicializarEliminarUsuario() {
    // Eliminar desde tabla
    document.addEventListener('eliminarDesdeTabla', (e) => {
        usuarioSeleccionado = e.detail;
        mostrarConfirmacionEliminacion(usuarioSeleccionado);
    });

    // Confirmación
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', confirmarEliminacion);
    
    // Cancelación
    document.getElementById('cancelDeleteBtn')?.addEventListener('click', cancelarEliminacion);
}

async function mostrarConfirmacionEliminacion(userId) {
    try {
        // Cambiar a la pestaña de eliminación
        const tabEliminar = document.querySelector('#userTabs button[data-bs-target="#eliminar"]');
        if (tabEliminar) {
            const tabInstance = new bootstrap.Tab(tabEliminar);
            tabInstance.show();
        }

        // Obtener los datos del usuario
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/users/show', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        const usuarios = Array.isArray(data) ? data : data.users || data.data || [];
        const user = usuarios.find(u => u.id === userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Mostrar información del usuario a eliminar
        document.getElementById('userToDeleteInfo').textContent = `Nombre: ${user.name}, Email: ${user.email}, Rol: ${user.role}`;
        document.getElementById('confirmDeleteSection').classList.remove('d-none');
    } catch (error) {
        console.error('Error al cargar usuario:', error);
        alert('Error al cargar usuario');
    }
}

async function confirmarEliminacion() {
    if (!usuarioSeleccionado) return;

    if (!confirm('¿Estás seguro de eliminar este usuario permanentemente?')) {
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/users/trash/${usuarioSeleccionado}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Usuario eliminado correctamente');
            cancelarEliminacion();
            // Disparar evento 
            document.dispatchEvent(new CustomEvent('usuariosActualizados'));
        } else {
            const result = await response.json();
            alert(`Error: ${result.message || 'No se pudo eliminar el usuario'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
}

function cancelarEliminacion() {
    const confirmSection = document.getElementById('confirmDeleteSection');
    if (confirmSection) {
        confirmSection.classList.add('d-none');
    }
    usuarioSeleccionado = null;
}