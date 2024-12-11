import Task from '../models/task.js';

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    try {
        const result = await Task.findAll();
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener todas las tareas
export const getAllUserTasks = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await Task.findAll({ where: { user_id } });
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener todas las tareas por Id
export const getTaksById = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await Task.findByPk(id);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
    const { user_id, title } = req.body;
    if (!user_id || !title) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const result = await Task.create({ user_id, title })
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const taskToUpdate = await Task.findByPk(id);
        if (!taskToUpdate) {
            return res.status(404).send('Tarea no encontrada');
        }
        taskToUpdate.completed = !(taskToUpdate.completed)
        await taskToUpdate.save()
        res.json(taskToUpdate);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar la tarea por su ID
        const taskToDelete = await Task.findByPk(id);

        // Verificar si la tarea existe
        if (!taskToDelete) {
            return res.status(404).send('Tarea no encontrada');
        }

        // Eliminar la tarea
        await taskToDelete.destroy();

        // Responder con éxito
        res.status(200).send('Tarea eliminada correctamente');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};
