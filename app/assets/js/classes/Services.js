import { urlsApi } from "../global/config.js";

const Services = {
    show: async () => {
        try {
            const response = await fetch(urlsApi.baseURL + urlsApi.endpoints.service.show, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Crdentiales inválidas');
            }

            console.log(response);
        } catch(error) {
            console.error('Error: ',error);
        }
    }
}

export default Services;