export function generarResumen() {
    const resumen = `
        <div class="row">
            <div class="col-md-6">
                <p><strong>Cliente:</strong> ${document.getElementById('name').value} ${document.getElementById('lastName').value}</p>
                <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
                <p><strong>Teléfono:</strong> +${document.getElementById('codeNumber').value} ${document.getElementById('telephoneNumber').value}</p>
                <p><strong>Documento:</strong> ${document.getElementById('typeDocOfficial').value} - ${document.getElementById('idDocOfficial').value}</p>
            </div>
            <div class="col-md-6">
                <p><strong>Fechas:</strong> ${document.getElementById('entry_date').value} a ${document.getElementById('departure_date').value}</p>
                <p><strong>Habitación:</strong> ${document.getElementById('room_id').selectedOptions[0]?.textContent || 'No seleccionada'}</p>
                <p><strong>Método de Pago:</strong> ${document.getElementById('pay_method_id').selectedOptions[0]?.textContent || 'No seleccionado'}</p>
            </div>
        </div>
        <hr>
        <div class="text-center">
            <h4><strong>Total:</strong> ${document.getElementById('final_total').textContent}</h4>
        </div>
    `;
    document.getElementById('resumenReservacion').innerHTML = resumen;
}
