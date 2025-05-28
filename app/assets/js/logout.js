export default async function logout() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            console.log('Sesión Cerrada');
            //window.location.href = index.html;
        } else {
            const errorData = await response.json();
            alert('Error al cerrar sesión: ' + (errorData.message || response.statusText));
        }
    } catch (error) {
        console.error('Error en logout:', error);
        alert('Error en la conexión al cerrar sesión.');
    }
}
