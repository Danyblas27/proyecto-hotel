export async function cargarReservaciones() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/bookings/show', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        // Validar estructura de respuesta
        if (!result.data || !Array.isArray(result.data)) {
            throw new Error('Formato de respuesta inválido');
        }

        const reservaciones = result.data;
        const tabla = document.getElementById('reservationsTableBody');
        
        if (!tabla) {
            throw new Error('No se encontró la tabla en el DOM');
        }

        tabla.innerHTML = '';

        if (reservaciones.length === 0) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center">No hay reservaciones registradas</td>
                </tr>
            `;
            return;
        }

        reservaciones.forEach(reserva => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${reserva.id}</td>
                <td>${reserva.client_name} ${reserva.client_last_name}</td>
                <td>${formatDate(reserva.entry_date)}</td>
                <td>${formatDate(reserva.departure_date)}</td>
                <td><span class="badge ${getStatusBadgeClass(reserva.status)}">${reserva.status}</span></td>
                <td>$${reserva.total_amount}</td>
                <td>${reserva.pay_method_type}</td>
                <td>Hab. ${reserva.room_number} (${reserva.room_type})</td>
                <td>${reserva.user_name}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="cancelarReserva(${reserva.id}, ${reserva.room_number})">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            `;
            fila.dataset.id = reserva.id;
            tabla.appendChild(fila);
        });

    } catch (error) {
        console.error('Error al cargar reservaciones:', error);
        mostrarErrorEnTabla(error.message);
        alert('Error al cargar reservaciones: ' + error.message);
    }
}

// Funciones auxiliares

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
}

function getStatusBadgeClass(status) {
    const statusClasses = {
        'Pending': 'bg-warning text-dark',
        'Confirmed': 'bg-success',
        'Cancelled': 'bg-danger',
        'Completed': 'bg-primary'
    };
    return statusClasses[status] || 'bg-secondary';
}

function mostrarErrorEnTabla(mensaje) {
    const tabla = document.getElementById('reservationsTableBody');
    if (tabla) {
        tabla.innerHTML = `
            <tr>
                <td colspan="10" class="text-center text-danger">
                    ${mensaje}
                </td>
            </tr>
        `;
    }
}


window.cancelarReserva = async (resId, roomNum) => {
    const confirmar = confirm(`¿Deseas cancelar la reserva #${resId}?`);
    if (!confirmar) return;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('No hay token disponible. Por favor inicia sesión.');
        return;
    }

    try {
        // 2. Actualizar disponibilidad del cuarto a disponible (1)
        const response = await fetch('http://localhost:3000/api/rooms/show', {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const rooms = data.data;
        
        const room = rooms.find(r => r.number === String(roomNum));
        console.log(rooms)
        const roomId = room.id;
        const actualizarHabitacionRes = await fetch(`http://localhost:3000/api/rooms/setAvailAvailability/${roomId}/1`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!actualizarHabitacionRes.ok) {
            const error = await actualizarHabitacionRes.json();
            throw new Error(error.message || 'Reserva cancelada, pero hubo un error al actualizar la habitación.');
        }

        alert(`Reserva #${resId} cancelada con éxito.`);

        const fila = document.querySelector(`tr[data-id="${resId}"]`);
        const celdaEstado = fila?.querySelector('td:nth-child(5)'); // columna del estado
        if (celdaEstado) {
            celdaEstado.innerHTML = `<span class="badge bg-danger">Cancelled</span>`;
        }

    } catch (error) {
        console.error('Error al cancelar reserva:', error);
        alert(`Error: ${error.message}`);
    }
    
};