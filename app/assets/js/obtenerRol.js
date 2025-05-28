export default async function obtenerRol() {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token disponible');
        
        const response = await fetch('http://localhost:3000/api/auth/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error('Error al obtener perfil');
        
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Error obteniendo rol:', error);
        throw error;
    }
}