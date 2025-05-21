let habitacionSeleccionada = null;

export function inicializarEliminarHabitacion() {
    // Escuchar evento desde la tabla
    document.addEventListener('eliminarHabitacionDesdeTabla', (e) => {
        habitacionSeleccionada = e.detail;
        mostrarConfirmacionEliminacion(habitacionSeleccionada);
    });

    // Confirmar eliminación
    document.getElementById('confirmDeleteRoomBtn')?.addEventListener('click', confirmarEliminacion);

    // Cancelar eliminación
    document.getElementById('cancelDeleteRoomBtn')?.addEventListener('click', cancelarEliminacion);
}

function mostrarConfirmacionEliminacion(habitacion) {
    // Cambiar a pestaña de eliminación
    const tabEliminar = document.querySelector('#roomTabs button[data-bs-target="#eliminar-habitacion"]');
    if (tabEliminar) {
        const tabInstance = new bootstrap.Tab(tabEliminar);
        tabInstance.show();
    }

    // Mostrar información de la habitación
    document.getElementById('roomToDeleteInfo').textContent = 
        `Tipo: ${habitacion.type}, Capacidad: ${habitacion.capacity}, Precio: $${habitacion.price.toFixed(2)}`;

    // Mostrar sección de confirmación
    document.getElementById('confirmDeleteRoomSection').classList.remove('d-none');
}

async function confirmarEliminacion() {
    if (!habitacionSeleccionada) return;

    if (!confirm('¿Estás seguro de eliminar esta habitación permanentemente?')) {
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/rooms/trash/${habitacionSeleccionada.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Habitación eliminada exitosamente');
            cancelarEliminacion();
            document.dispatchEvent(new CustomEvent('habitacionesActualizadas'));
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Error al eliminar');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar habitación: ' + error.message);
    }
}

function cancelarEliminacion() {
    document.getElementById('confirmDeleteRoomSection').classList.add('d-none');
    habitacionSeleccionada = null;
}