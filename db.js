import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,       // Usuario de la base de datos
    host: process.env.DB_HOST,       // Host proporcionado por Render
    database: process.env.DB_NAME,   // Nombre de la base de datos
    password: process.env.DB_PASS,   // Contraseña
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('Conexión exitosa con PostgreSQL'))
    .catch(err => console.error('Error al conectar con PostgreSQL:', err));

export default pool;
