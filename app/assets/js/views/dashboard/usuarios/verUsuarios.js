export async function cargarUsuarios() {
    try {
        const token = localStorage.getItem('token'); // Obtener el token almacenado
        
        const response = await fetch('http://localhost:3000/api/users/show', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include' 
        });

        // Verificar si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const usuarios = Array.isArray(data) ? data : data.users || data.data || [];
        const tabla = document.getElementById('userTableBody');
        tabla.innerHTML = '';

        usuarios.forEach(user => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" data-id="${user.id}">Editar</button>
                    <button class="btn btn-sm btn-danger" data-id="${user.id}">Eliminar</button>
                </td>
            `;
            
            fila.querySelector('.btn-warning').addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('editarDesdeTabla', { detail: user.id }));
                document.querySelector('#userTabs button[data-bs-target="#editar"]').click();
            });
            
            fila.querySelector('.btn-danger').addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('eliminarDesdeTabla', { detail: user.id }));
                document.querySelector('#userTabs button[data-bs-target="#eliminar"]').click();
            });
            
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        alert('Error al cargar la lista de usuarios');
    }
}