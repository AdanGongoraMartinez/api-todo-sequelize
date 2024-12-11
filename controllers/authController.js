import bcrypt from 'bcrypt';
import User from "../models/user.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const result = await User.findAll();
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Comprobar inicio de session
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validar entrada
    if (!email || !password) {
        return res.status(400).send('Correo y contraseña son obligatorios');
    }

    try {
        // Buscar al usuario por correo
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        // Responder con el token y la información básica del usuario
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            success: true
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Registrar Usuario
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validar entrada del usuario
    if (!name || !email || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).send('El correo ya está registrado');
        }

        // Cifrar la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Excluir la contraseña de la respuesta
        const { password: _, ...userWithoutPassword } = newUser.toJSON();

        res.status(201).json(userWithoutPassword);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};
