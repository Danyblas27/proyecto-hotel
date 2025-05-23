document.getElementById("formRegistro").addEventListener("submit", function (event) { event.preventDefault(); // Evita que recargue la página
    const data = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        email: document.getElementById("email").value,
        nacionalidad: document.getElementById("nacionalidad").value,
        clave: document.getElementById("clave").value,
        telefono: document.getElementById("telefono").value,
        tipoDocumento: document.getElementById("tipoDocumento").value,
        idDocumento: document.getElementById("idDocumento").value,
        fechaEntrada: document.getElementById("fechaEntrada").value,
        fechaSalida: document.getElementById("fechaSalida").value,
        numPersonas: parseInt(document.getElementById("numPersonas").value)
    };
    
    fetch("http://localhost:3000/api/clients/create", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        } return response.json();
    })
    .then(result => {
        alert("Reservación enviada con éxito.");
        document.getElementById("formRegistro").reset();
        console.log("Respuesta de la API: ", result);
    })
    .catch(error => {
        console.error("Error al enviar la reservación: ", error);
        alert("Ocurrió un error al enviar los datos. Revisa la consola.");
    });
});