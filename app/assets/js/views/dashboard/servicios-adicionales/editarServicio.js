let servicioSeleccionado = null;

export function inicializarEditarServicio() {
    // Escuchar evento desde la tabla
    document.addEventListener('editarServicioDesdeTabla', (e) => {
        servicioSeleccionado = e.detail;
        mostrarFormularioEdicion(servicioSeleccionado);
    });

    // Cancelar edición
    document.getElementById('cancelEditServiceBtn')?.addEventListener('click', cancelarEdicion);

    // Enviar formulario
    document.getElementById('editServiceForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!servicioSeleccionado) return;

        const serviceData = {
            name: document.getElementById('editServiceName').value,
            description: document.getElementById('editServiceDescription').value,
            price: parseFloat(document.getElementById('editServicePrice').value)
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/additional-services/edit/${servicioSeleccionado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(serviceData)
            });

            if (response.ok) {
                alert('Servicio actualizado exitosamente');
                cancelarEdicion();
                // Disparar evento para actualizar la tabla
                document.dispatchEvent(new CustomEvent('serviciosActualizados'));
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Error al actualizar el servicio');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar servicio: ' + error.message);
        }
    });
}

// Función para editar desde la tabla
window.editarServicio = function(serviceId) {
    const servicio = Array.from(document.querySelectorAll('#serviceTableBody tr')).map(row => {
        return {
            id: row.querySelector('button').getAttribute('onclick').match(/'([^']+)'/)[1],
            name: row.cells[0].textContent,
            price: parseFloat(row.cells[1].textContent.replace('$', '')),
            description: row.cells[2].textContent
        };
    }).find(s => s.id === serviceId);

    if (servicio) {
        document.dispatchEvent(new CustomEvent('editarServicioDesdeTabla', { detail: servicio }));
    }
};

function mostrarFormularioEdicion(servicio) {
    // Cambiar a pestaña de edición
    const tabEditar = document.querySelector('#serviceTabs button[data-bs-target="#editar-servicio"]');
    if (tabEditar) {
        const tabInstance = new bootstrap.Tab(tabEditar);
        tabInstance.show();
    }

    // Llenar formulario
    document.getElementById('editServiceName').value = servicio.name;
    document.getElementById('editServicePrice').value = servicio.price;
    document.getElementById('editServiceDescription').value = servicio.description;

    // Mostrar sección de edición
    document.getElementById('editServiceFormFields').classList.remove('d-none');
}

function cancelarEdicion() {
    document.getElementById('editServiceFormFields').classList.add('d-none');
    document.getElementById('editServiceForm').reset();
    servicioSeleccionado = null;
}