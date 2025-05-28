document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formReservacion');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita recargar la página

    const data = {
      email: document.getElementById('email').value,
      numeroTarjeta: document.getElementById('numero-tarjeta').value,
      expiry: document.getElementById('expiry').value,
      cvc: document.getElementById('cvc').value,
      pais: document.getElementById('pais').value,
      preferencias: document.getElementById('preferencias').value,
      metodoPago: document.querySelector('input[name="metodoPago"]:checked')?.id || 'no-seleccionado'
    };

    try {
      const response = await fetch('http://localhost:3000/api/clients/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const result = await response.json();
      alert('Reservación enviada con éxito.');
      console.log(result);

    } catch (error) {
      console.error('Error al enviar la reservación:', error);
      alert('Hubo un error al enviar tu reservación. Revisa la consola para más detalles.');
    }
  });
});
