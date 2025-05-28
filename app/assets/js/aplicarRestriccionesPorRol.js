export default function aplicarRestriccionesPorRol() {
    const userRole = localStorage.getItem('userRole') || 'recepcion';
    
    // Mostrar/ocultar elementos del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.classList.contains('all-roles')) {
            item.style.display = 'block';
        } else if (item.classList.contains('admin-only')) {
            item.style.display = userRole === 'admin' ? 'block' : 'none';
        }
    });
    return;
}