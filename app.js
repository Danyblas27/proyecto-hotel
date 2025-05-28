import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { responses } from './api/middleware/index.js';
import { additionalServiceRoute, additionalServicesBookingRoute, authRoute, bookingRoute, clientsRoute, payMethodRoute, roomsRoute, usersRoute } from './api/routes/index.js';

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//? Middlewares global
app.use(express.json());
app.use(cookieParser());

//? Route
app.use('/api/auth', authRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/clients', clientsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/pay-methods', payMethodRoute);
app.use('/api/additional-services', additionalServiceRoute);
app.use('/api/additional-services-booking', additionalServicesBookingRoute);

// app.use('/api/dashboard', verifyToken, dashboardRoute);

//? Middleware error handler
app.use(responses.errorHandler);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});