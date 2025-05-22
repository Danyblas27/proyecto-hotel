let habitacionSeleccionada = null;

export function inicializarEditarHabitacion() {
    // Escuchar evento desde la tabla
    document.addEventListener('editarHabitacionDesdeTabla', (e) => {
        habitacionSeleccionada = e.detail;
        mostrarFormularioEdicion(habitacionSeleccionada);
        
        // Cambiar a pestaña de edición
        const tabEditar = document.querySelector('#roomTabs button[data-bs-target="#editar-habitacion"]');
        if (tabEditar) {
            const tab = new bootstrap.Tab(tabEditar);
            tab.show();
        }
    });

    // Cancelar edición
    document.getElementById('cancelEditRoomBtn')?.addEventListener('click', cancelarEdicion);

    // Enviar formulario
    document.getElementById('editRoomForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!habitacionSeleccionada) return;

        const roomData = {
            type: document.getElementById('editRoomType').value,
            capacity: parseInt(document.getElementById('editRoomCapacity').value),
            price: parseFloat(document.getElementById('editRoomPrice').value),
            description: document.getElementById('editRoomDescription').value
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/rooms/edit/${habitacionSeleccionada.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roomData)
            });

            if (response.ok) {
                alert('Habitación actualizada exitosamente');
                cancelarEdicion();
                document.dispatchEvent(new CustomEvent('habitacionesActualizadas'));
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Error al actualizar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar habitación: ' + error.message);
        }
    });
}

function mostrarFormularioEdicion(habitacion) {
    // Llenar formulario
    document.getElementById('editRoomType').value = habitacion.type;
    document.getElementById('editRoomNumber').value = habitacion.number;
    document.getElementById('editRoomCapacity').value = habitacion.capacity;
    document.getElementById('editRoomPrice').value = habitacion.price;
    document.getElementById('editRoomDescription').value = habitacion.description;

    // Mostrar sección de edición
    document.getElementById('editRoomFormFields').classList.remove('d-none');
}

function cancelarEdicion() {
    document.getElementById('editRoomFormFields').classList.add('d-none');
    document.getElementById('editRoomForm').reset();
    habitacionSeleccionada = null;
}