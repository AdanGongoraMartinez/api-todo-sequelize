import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // No permite valores nulos
        validate: {
            notEmpty: true, // Asegura que no sea una cadena vacía
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // No permite valores nulos
        unique: true, // El email debe ser único
        validate: {
            isEmail: true, // Verifica que sea un formato válido de correo
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // No permite valores nulos
        validate: {
            len: [8, 100], // La contraseña debe tener entre 8 y 100 caracteres
        },
    },
}, {
    timestamps: true, // Incluye columnas createdAt y updatedAt
});

export default User;
