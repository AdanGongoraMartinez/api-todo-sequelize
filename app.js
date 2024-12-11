import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Configuración de la base de datos
import pool from './db.js';

const app = express();
app.disable('x-powered-by');
const port = 3000;

// Configuración básica (permitir todas las solicitudes)
app.use(cors({
    origin: 'http://localhost:4200', // Cambia al dominio de tu frontend
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));

// Middleware
// app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

