document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../../login.html';
        return;
    }

    // Configurar logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = '../../login.html';
    });

    // Manejar el formulario
    const form = document.getElementById('registroReservacionForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Datos del cliente
        const clienteData = {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            country: document.getElementById('country').value,
            codeNumber: document.getElementById('codeNumber').value,
            telephoneNumber: document.getElementById('telephoneNumber').value,
            typeDocOfficial: document.getElementById('typeDocOfficial').value,
            idDocOfficial: document.getElementById('idDocOfficial').value
        };

        // Datos de la reservación TODAVIA NO HACE NADA
        /*const reservacionData = {
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            guests: document.getElementById('guests').value
        };*/

        try {
            // 1. Registrar al cliente
            const clienteResponse = await fetch('http://localhost:3000/api/clients/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(clienteData)
            });

            if (!clienteResponse.ok) {
                const errorData = await clienteResponse.json();
                throw new Error(errorData.message || 'Error al registrar cliente');
            }
            alert('Cliente creado exitosamente!')
            form.reset();
        
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    });

    // Validar fechas
    document.getElementById('checkOut').addEventListener('change', function() {
        const checkIn = new Date(document.getElementById('checkIn').value);
        const checkOut = new Date(this.value);
        
        if (checkOut <= checkIn) {
            alert('La fecha de salida debe ser posterior a la fecha de entrada');
            this.value = '';
        }
    });
});