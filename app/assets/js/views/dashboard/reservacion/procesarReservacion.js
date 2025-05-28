import { calcularTotal } from './calculo.js';
import { crearCliente, obtenerClientePorEmail } from './cliente.js';

export async function procesarReservacion() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debe iniciar sesión primero');
        return;
    }

    try {
        const email = document.getElementById('email').value;
        if (!email) {
            alert('Por favor proporcione un email válido');
            return;
        }

        // 1. Buscar o crear cliente
        let clientId = await obtenerClientePorEmail(email);
        if (!clientId) {
            console.log('Cliente no encontrado, creando nuevo...');
            clientId = await crearCliente();
        }
        /*
        if (!clientId) {
            alert('No se pudo obtener o crear el cliente');
            return;
        }*/

        console.log('ID del cliente:', clientId);

        // 2. Preparar datos de reservación
        const reservacionData = {
            entry_date: document.getElementById('entry_date').value,
            departure_date: document.getElementById('departure_date').value,
            status: "Pending",
            room_id: document.getElementById('room_id').value,
            client_id: clientId,
            total_amount: calcularTotal(),
            id_doc_official: document.getElementById('idDocOfficial').value,
            pay_method_id: document.getElementById('pay_method_id').value,
            key_handover_time: `15:00:00`,
            key_reception_time: `12:00:00`
        };

        // Validar datos de reservación
        if (!reservacionData.entry_date || !reservacionData.departure_date || !reservacionData.room_id) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        // 3. Actualizar disponibilidad de habitación pero no hay id
        const updateResponse = await fetch(`http://localhost:3000/api/rooms/setAvailAvailability/${reservacionData.room_id}/0`, {
            method: 'PATCH',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al actualizar disponibilidad de la habitación');
        }

        // 4. Crear reservación
        const res = await fetch('http://localhost:3000/api/bookings/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reservacionData)
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al crear reservación');
        }

        const reservacionCreada = await res.json();
        console.log('Reservación creada:', reservacionCreada);
        
        alert('Reservación creada exitosamente');
        document.getElementById('registroReservacionForm').reset();
        document.querySelector('.nav-link[data-step="1"]').click();

    } catch (error) {
        console.error('Error al procesar reservación:', error);
        alert(`Error al procesar reservación: ${error.message}`);

        // Intento de poner la habitacion como ocupada

        try {
            const roomId = document.getElementById('room_id').value;
            if (roomId) {
                await fetch(`http://localhost:3000/api/rooms/setAvailAvailability/${roomId}/1`, {
                    method: 'PATCH',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (revertError) {
            console.error('Error al revertir cambios:', revertError);
        }
    }
}