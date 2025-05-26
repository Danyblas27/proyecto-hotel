export function inicializarCrearServicio() {
    const token = localStorage.getItem('token');
    const form = document.getElementById('createServiceForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener valores
        const name = form.elements['serviceName'].value.trim();
        const description = form.elements['serviceDescription'].value.trim();
        const price = parseFloat(form.elements['servicePrice'].value);

        // Validaciones básicas
        if (!name || !description || isNaN(price)) {
            alert('Por favor complete todos los campos correctamente');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/additional-services/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, description, price })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Servicio creado exitosamente');
                form.reset();
                document.dispatchEvent(new CustomEvent('serviciosActualizados'));
            } else {
                alert(`Error: ${data.message || 'No se pudo crear el servicio'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    });
}