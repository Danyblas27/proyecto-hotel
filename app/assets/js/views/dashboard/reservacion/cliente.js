export async function crearCliente() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debe iniciar sesión primero');
            return null;
        }

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

        // Validar datos antes de enviar
        if (!clienteData.email || !clienteData.name || !clienteData.lastName) {
            alert('Por favor complete todos los campos requeridos');
            return null;
        }

        const response = await fetch('http://localhost:3000/api/clients/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(clienteData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }

        const cliente = await response.json();
        return obtenerClientePorEmail(cliente.data.email);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        alert(`Error al crear cliente: ${error.message}`);
        return null;
    }
}

export async function obtenerClientePorEmail(email) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debe iniciar sesión primero');
            return null;
        }

        const response = await fetch('http://localhost:3000/api/clients/show', {
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
        const clientes = data.data;
        
        const cliente = clientes.find(c => c.email === email);
        if (!cliente) {
            console.log('Cliente no encontrado con email:', email);
            return null;
        }
        
        return cliente.id;
    } catch (error) {
        console.error('Error al buscar cliente:', error);
        alert(`Error al buscar cliente: ${error.message}`);
        return null;
    }
}