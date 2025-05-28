document.addEventListener('DOMContentLoaded', () => {
    const botonesSeleccionar = document.querySelectorAll('.servicio-card .btn');
    
    botonesSeleccionar.forEach((boton) => {
        boton.addEventListener('click', async () => {
            // Extraemos la información del servicio
            const card = boton.closest('.servicio-card');
            const nombre = card.querySelector('.card-title').textContent;
            const descripcion = card.querySelector('.card-text').textContent;
            const precioTexto = Array.from(card.querySelectorAll('.card-text'))
            .find(p => p.textContent.includes('Precio'))
            .textContent;
            
            const data = {
                servicio: nombre,
                descripcion,
                precio: precioTexto
            };
            
            try {
                const response = await fetch('http://localhost:3000/api/services/select', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status}`);
                }
                
                const result = await response.json();
                alert(`Servicio "${nombre}" seleccionado con éxito.`);
                console.log(result);
            } catch (error) {
                console.error('Error al seleccionar servicio:', error);
                alert('Hubo un error al seleccionar el servicio. Revisa la consola.');
            }
        });
    });
});
