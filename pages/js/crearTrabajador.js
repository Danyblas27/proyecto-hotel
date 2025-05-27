export function iniciarCrearTrabajador() {
   // console.log('ejecutar iniciarCrearTrabajador');
    const form = document.getElementById('formularioRegistro');
    if (!form) return;

    function limpiarErrores() {
        document.getElementById('regName').textContent = '';
        document.getElementById('regEmail').textContent = '';
        document.getElementById('regPassword').textContent = '';
    }


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 🔁 PRIMERO: obtener los valores del formulario
        const name = form.elements['regName'].value.trim();
        const email = form.elements['regEmail'].value.trim();
        const password = form.elements['regPassword'].value;
        const role = "Recepcion"

        //  AHORA sí puedes armar el objeto
        const createJob = { name, email, password, role};

        console.log('Datos a enviar:', createJob); // ← este ya funcionará

        limpiarErrores();

       // if (!validarFormulario(createJob)) return;

        try {

            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createJob)
            });

            console.log('Status de creación:', response.status);
            const data = await response.json();
            console.log('Datos de respuesta:', data);

            if (response.ok) {
                alert('Usuario creado exitosamente');
                form.reset();
            } else if (response.status === 409){
                mostrarError('Este correo esta registrado');
            }
            else {
                mostrarError(data.message || 'Error al crear usuario');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al conectar con el servidor');
        }
    });

}