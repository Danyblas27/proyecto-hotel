export function inicializarCrearHabitacion() {
    const form = document.getElementById('createRoomForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const roomData = {
            type: document.getElementById('roomType').value.toUpperCase().trim(),
            capacity: parseInt(document.getElementById('roomCapacity').value),
            price: parseFloat(document.getElementById('roomPrice').value),
            description: document.getElementById('roomDescription').value
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/rooms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roomData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Habitación creada exitosamente');
                form.reset();
                // Actualizar la lista de habitaciones
                document.dispatchEvent(new CustomEvent('habitacionesActualizadas'));
            } else {
                throw new Error(data.message || 'Error al crear habitación');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear habitación: ' + error.message);
        }
    });
}