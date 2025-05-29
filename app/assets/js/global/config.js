
export const urlsApi = {
    baseURL: 'http://localhost:3000/api',
    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            profile: '/auth/profile',
            logout: '/auth/logout'
        },
        booking: {
            create: '/bookings/create',
            show: '/bookings/show',
            availability: '/bookings/availability/',
        },
    }
}
