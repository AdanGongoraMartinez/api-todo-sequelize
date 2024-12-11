import pool from '../db.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Comprobar inicio de session
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("login try")
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );
        if (result.rows.length === 0) {
            return res.send('Login Error');
        }
        // res.send('Successful Login');
        return res.json({ success: true, user_id: result.rows[0].id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Registrar Usuario
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users ( name, email, password ) VALUES ($1,$2,$3) RETURNING *',
            [name, email, password]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};
