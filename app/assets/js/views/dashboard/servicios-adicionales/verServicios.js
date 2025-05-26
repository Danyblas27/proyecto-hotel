export async function cargarServicios() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/additional-services/show', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const servicios = await response.json();
        
        const tabla = document.getElementById('serviceTableBody');
        tabla.innerHTML = '';

        servicios.forEach(service => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${service.name}</td>
                <td>$${service.price}</td>
                <td>${service.description.substring(0, 50)}${service.description.length > 50 ? '...' : ''}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" onclick="editarServicio('${service.id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarServicio('${service.id}')">Eliminar</button>
                </td>
            `;
            fila.dataset.id = service.id;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar servicios:', error);
        alert('Error al cargar la lista de servicios');
    }
}

// Función para el botón "Ver Servicios"
window.mostrarServicios = function() {
    cargarServicios();
    document.querySelector('#serviceTabs button[data-bs-target="#ver"]').click();
};