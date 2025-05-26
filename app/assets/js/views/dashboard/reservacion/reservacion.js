import obtenerRol from "../../../obtenerRol.js";
import aplicarRestriccionesPorRol from "../../../aplicarRestriccionesPorRol.js";

async function loginForzado() {
    try {
        await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include' 
        });

        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "hrodriguez22@ucol.mx",
                password: "12345678" 
            }),
            credentials: 'include' 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el login');
        }

        const data = await response.json();
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Login exitoso. Token almacenado:', data.token);
            
            // Obtener y guardar el rol del usuario
            const user = await obtenerRol();
            if (user) {
                localStorage.setItem('userRole', user.role.toLowerCase());
            }
            
            return user;
        }
        throw new Error('El servidor no devolvió un token');
    } catch (error) {
        console.error('Error en login forzado:', error);
        throw error;
    }
}


function manejarFormularioReservacion() {
    const form = document.getElementById('registroReservacionForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
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

        try {
            const token = localStorage.getItem('token');
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
            alert('Cliente creado exitosamente!');
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    });

    // Validación de fechas
    const checkOutInput = document.getElementById('checkOut');
    if (checkOutInput) {
        checkOutInput.addEventListener('change', function() {
            const checkIn = new Date(document.getElementById('checkIn').value);
            const checkOut = new Date(this.value);
            
            if (checkOut <= checkIn) {
                alert('La fecha de salida debe ser posterior a la fecha de entrada');
                this.value = '';
            }
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Verificar autenticación
        const token = localStorage.getItem('token');
        if (!token) {
            await loginForzado();
        }

        // Aplicar restricciones de rol
        aplicarRestriccionesPorRol();

        manejarFormularioReservacion();

    } catch (error) {
        console.error('Error inicializando aplicación:', error);
        // window.location.href = '../../login.html';
    }
});