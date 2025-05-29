export async function cargarHabitaciones() {
    try {
        const entrada = new Date(document.getElementById('entry_date').value);
        const salida = new Date(document.getElementById('departure_date').value);
        const token = localStorage.getItem('token');
        if (!token) return alert('Debe iniciar sesión primero');

        const response = await fetch(`http://localhost:3000/api/bookings/availability/?entry_date=${entrada}&departure_date=${salida}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();
        const habitaciones = Array.isArray(data) ? data : data.data || [];
        const select = document.getElementById('room_id');
        select.innerHTML = '<option value="">Seleccione una habitación</option>';

        habitaciones.forEach(habitacion => {
                const option = document.createElement('option');
                option.value = habitacion.id;
                option.textContent = `Hab. ${habitacion.number} (${habitacion.type}) - $${habitacion.price}`;
                option.dataset.price = habitacion.price;
                select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar habitaciones:', error);
        alert('Error al cargar habitaciones: ' + error.message);
    }
}

export async function cargarMetodosPago() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return alert('Debe iniciar sesión primero');

        const response = await fetch('http://localhost:3000/api/pay-methods/show', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();
        const metodos = Array.isArray(data) ? data : data.data || [];
        const select = document.getElementById('pay_method_id');
        select.innerHTML = '<option value="">Seleccione un método de pago</option>';

        metodos.forEach(metodo => {
            const option = document.createElement('option');
            option.value = metodo.id;
            option.textContent = metodo.type;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar métodos de pago:', error);
        alert('Error al cargar métodos de pago: ' + error.message);
    }
}
