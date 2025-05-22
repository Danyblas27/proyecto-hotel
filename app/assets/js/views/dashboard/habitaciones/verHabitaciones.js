let habitaciones = [];

export async function mostrarHabitaciones() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/rooms/show', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        habitaciones = Array.isArray(data) ? data : data.rooms || data.data || [];
        
        renderizarTablaHabitaciones();
    } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        alert('Error al cargar habitaciones');
    }
}

function renderizarTablaHabitaciones() {
    const tbody = document.getElementById('roomTableBody');
    tbody.innerHTML = '';

    habitaciones.forEach(habitacion => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${habitacion.type}</td>
            <td>${habitacion.number}</td>
            <td>${habitacion.capacity}</td>
            <td>$${habitacion.price}</td>
            <td>${habitacion.description}</td>
            <td>
                <select class="form-select status-select" data-id="${habitacion.id}" style="width: 120px;">
                    <option value="AVAILABLE" ${habitacion.status === 'AVAILABLE' ? 'selected' : ''}>Disponible</option>
                    <option value="OCCUPIED" ${habitacion.status === 'OCCUPIED' ? 'selected' : ''}>Ocupada</option>
                    <option value="MAINTENANCE" ${habitacion.status === 'MAINTENANCE' ? 'selected' : ''}>Mantenimiento</option>
                </select>
            </td>
            <td>
                <button class="btn btn-sm btn-warning me-2 editar-btn" data-id="${habitacion.id}">Editar</button>
                <button class="btn btn-sm btn-danger eliminar-btn" data-id="${habitacion.id}">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });

    // Agregar event listeners para los botones
    document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const habitacion = habitaciones.find(h => h.id == id);
            if (habitacion) {
                document.dispatchEvent(new CustomEvent('editarHabitacionDesdeTabla', { 
                    detail: habitacion 
                }));
            }
        });
    });

    document.querySelectorAll('.eliminar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const habitacion = habitaciones.find(h => h.id == id);
            if (habitacion) {
                document.dispatchEvent(new CustomEvent('eliminarHabitacionDesdeTabla', { 
                    detail: habitacion 
                }));
            }
        });
    });

    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', (e) => {
            actualizarStatusHabitacion(e.target.dataset.id, e.target.value);
        });
    });
}

async function actualizarStatusHabitacion(id, status) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/rooms/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar estado');
        }
        
        mostrarHabitaciones();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar estado de habitación');
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', mostrarHabitaciones);
document.addEventListener('habitacionesActualizadas', mostrarHabitaciones);