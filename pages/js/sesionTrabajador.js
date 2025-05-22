export function iniciarSesionTrabajador() {
    const form = document.getElementById('formularioLogin');
    if (!form) return;


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.elements['email'].value.trim();
        const password = form.elements['password'].value;


        const dataJob = {
            email: email,
            password: password
        }

        limpiarErrores();



        if (!validarFormulario(dataJob)) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({dataJob})

         })
            /*.then(response => response.json()).then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token); // Almacenar token

        }); }*/

             data = await response.json();


            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'reservacion.html'; // Redirige al dashboard
                }
            } else {
                alert(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    });
}

function limpiarErrores() {
    // Implementa según necesites aun pendiente de aqui hasta el codigo de abajo para no perderme
}

function validarFormulario(email, password) {
    // Implementa validación básica
    return true;
}

function mostrarError(mensaje) {
    alert(`Error: ${mensaje}`);
}
/*
function registrar(form) {
    if (document.getElementById("regEmail").value &&
        document.getElementById("regName").value &&
        document.getElementById("regPhone").value &&
        document.getElementById("regPassword").value) {
         alert("Correctamente creado");
         form.reset();
    } else {
        alert("Completa todos los campos");
    }
};*/
