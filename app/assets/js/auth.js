import Auth from "./classes/Auth.js";
import { dashboardRoutes } from "./routes/index.route.js";


document.addEventListener("DOMContentLoaded", () => {

    //localStorage.removeItem("token"); // Elimina el token al cargar la página
    const existSession = localStorage.getItem("token") ? true : false;
    if (existSession) {
        window.location.href = dashboardRoutes.home;
    }

    const loginForm = document.getElementById("formularioLogin");
    const registerForm = document.getElementById("formularioRegistro");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = loginForm.elements['email'].value.trim();
            const password = loginForm.elements['password'].value;

            if (!email || !password) {
                return alert("Correo y contraseña obligatorios");
            }

            try {
                await Auth.login(email, password);
                window.location.href = dashboardRoutes.home;
            } catch (err) {
                alert(err.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = registerForm.elements['regName'].value.trim();
            const email = registerForm.elements['regEmail'].value.trim();
            const password = registerForm.elements['regPassword'].value;

            if (!name || !email || !password) {
                return alert("Todos los campos son obligatorios");
            }

            try {
                await Auth.register(name, email, password);
                alert("Registro exitoso");
                window.location.href = 'login.html';
            } catch (err) {
                alert(err.message);
            }
        });
    }
});
