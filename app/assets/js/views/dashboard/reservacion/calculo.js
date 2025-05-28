import { cargarHabitaciones } from "./cargarHabYPago.js";

export function validarFechas() {
    const entrada = new Date(document.getElementById('entry_date').value);
    const salida = new Date(document.getElementById('departure_date').value);

    if (!entrada || !salida) return false;
    if (salida <= entrada) {
        alert('La fecha de salida debe ser posterior a la de entrada');
        document.getElementById('departure_date').value = '';
        return false;
    }
    
    return true;
}

export function calcularTotal() {
    const entrada = new Date(document.getElementById('entry_date').value);
    const salida = new Date(document.getElementById('departure_date').value);

    if (!entrada || !salida || salida <= entrada) {
        document.getElementById('total_amount').textContent = '$0.00';
        document.getElementById('final_total').textContent = '$0.00';
        return 0;
    }

    const dias = Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24));
    const precio = document.getElementById('room_id').selectedOptions[0]?.dataset.price || 0;
    const total = (dias * precio);

    document.getElementById('total_amount').textContent = `$${total}`;
    document.getElementById('final_total').textContent = `$${total}`;

    return total;
}
