import express from 'express';

import { responses } from './middleware/index.js';
import { clientsRoute, usersRoute } from './routes/index.js';

const app = express();

//? Middlewares global
app.use(express.json());

//? Route
app.use('/api/clients', clientsRoute);
app.use('/api/users', usersRoute);

//? Middleware error handler
app.use(responses.errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
