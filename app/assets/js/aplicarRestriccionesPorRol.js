export default function aplicarRestriccionesPorRol(rol) {
    // const userRole = localStorage.getItem('userRole') || 'recepcion';
    const userRole = rol.role.toLowerCase();
    console.log(userRole)
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