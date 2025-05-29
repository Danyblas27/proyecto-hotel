import { validarPasoActual } from './pasos.js';
import { cargarHabitaciones, cargarMetodosPago } from './cargarHabYPago.js';
import { generarResumen } from './resumen.js';
import { validarFechas, calcularTotal } from './calculo.js';
import { procesarReservacion } from './procesarReservacion.js';

export function inicializarFormularioReservacion() {
    configurarNavegacionPasos();

    document.getElementById('entry_date').addEventListener('change', () => {
        //validarFechas();
        //calcularTotal();
    });

    document.getElementById('departure_date').addEventListener('change', () => {
        validarFechas();
        calcularTotal();
        cargarHabitaciones();
    });

    document.getElementById('room_id').addEventListener('change', calcularTotal);

    document.getElementById('registroReservacionForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        await procesarReservacion();
    });
}

function configurarNavegacionPasos() {
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', function (e) {
            //e.preventDefault();
            const step = this.getAttribute('data-step');
            if (validarPasoActual(step - 1)) mostrarPaso(step);
        });
    });

    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function () {
            const nextStep = this.getAttribute('data-next');
            if (validarPasoActual(nextStep - 1)) {
                if (nextStep === "2") {
                    //cargarHabitaciones();
                }
                else if (nextStep === "3") {
                    cargarMetodosPago();;
                }
                else if (nextStep === "4") {
                    generarResumen();
                }
                mostrarPaso(nextStep);
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function () {
            const prevStep = this.getAttribute('data-prev');
            mostrarPaso(prevStep);
        });
    });
}

function mostrarPaso(stepNumber) {
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-step') === stepNumber);
    });

    document.querySelectorAll('.step').forEach(step => {
        step.classList.toggle('active', step.id === `step${stepNumber}`);
    });
}
