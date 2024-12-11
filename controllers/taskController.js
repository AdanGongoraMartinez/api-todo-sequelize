import pool from '../db.js';
// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener todas las tareas
export const getAllUserTasks = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE user_id=$1 ORDER BY id ASC',
            [user_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener todas las tareas por Id
export const getTaksById = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (id) VALUES ($1) RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
    const { user_id, title } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (user_id, title) VALUES ($1,$2) RETURNING *',
            [user_id, title]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
            [completed, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Tarea no encontrada');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Tarea no encontrada');
        }
        res.json({ message: 'Tarea eliminada con éxito' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};
