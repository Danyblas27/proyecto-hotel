import { urlsApi } from "../global/config.js";

const urlsBooking = urlsApi.endpoints.booking;

const Booking = {
    create: async (reservacionData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(urlsApi.baseURL + urlsBooking.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservacionData)
            });
            
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al crear reservación');
            }
            
            const reservacionCreada = await res.json();
            console.log('Reservación creada:', reservacionCreada);
            
            alert('Reservación creada exitosamente');
        } catch (error) {
            console.error('Error al cargar habitaciones:', error);
            alert('Error al cargar habitaciones: ' + error.message);
        }
    },

    show: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(urlsApi.baseURL + urlsBooking.show, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            const rooms = data.data;
            return rooms;
        } catch (error) {
            console.error('Error al cargar habitaciones:', error);
            alert('Error al cargar habitaciones: ' + error.message);
        }
    },

    roomsAvailable: async (entrada, salida) => {
        try {
            const response = await fetch(`${urlsApi.baseURL + urlsBooking.show}?entry_date=${entrada}&departure_date=${salida}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error al cargar habitaciones:', error);
            alert('Error al cargar habitaciones: ' + error.message);
        }
    }
}

export default Booking;