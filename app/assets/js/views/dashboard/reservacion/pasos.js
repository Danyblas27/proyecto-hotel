import { validarFechas } from './calculo.js';

export function validarPasoActual(stepNumber) {
    if (stepNumber === 1) {
        const requiredFields = ['email', 'name', 'lastName', 'country', 'codeNumber', 'telephoneNumber', 'idDocOfficial'];
        for (const field of requiredFields) {
            if (!document.getElementById(field).value.trim()) {
                alert(`Por favor complete el campo ${field}`);
                return false;
            }
        }
        return true;
    } else if (stepNumber === 2) {
        if (!validarFechas()) return false;
        if (!document.getElementById('room_id').value) {
            alert('Por favor seleccione una habitación');
            return false;
        }
        return true;
    } else if (stepNumber === 3) {
        if (!document.getElementById('pay_method_id').value) {
            alert('Por favor seleccione un método de pago');
            return false;
        }
        return true;
    }
    return true;
}
