import Auth from "./classes/Auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                console.log('Cerrando sesión...');
                await Auth.logout();
            } catch (error) {
                console.error('Error en logout:', error);
                alert('Error en la conexión al cerrar sesión.');
            }
        });
    }
});
