import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { responses } from './middleware/index.js';
import { authRoute, clientsRoute, roomsRoute, usersRoute } from './routes/index.js';

dotenv.config();

const app = express();

//? Middlewares global
app.use(express.json());
app.use(cookieParser());

//? Route
app.use('/api/auth', authRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/clients', clientsRoute);
app.use('/api/users', usersRoute);
// app.use('/api/dashboard', verifyToken, dashboardRoute);

//? Middleware error handler
app.use(responses.errorHandler);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
