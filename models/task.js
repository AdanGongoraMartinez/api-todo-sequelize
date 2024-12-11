import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Task = sequelize.define("taks", {
    title: {
        type: DataTypes.STRING,
        allowNull: false, // No permite valores nulos
        validate: {
            notEmpty: true, // Asegura que no sea una cadena vacía
        },
    },
    user_id: {
        type: DataTypes.INTEGER, // Identificador del usuario
        allowNull: false, // No permite valores nulos
        references: {
            model: "users", // Nombre de la tabla referenciada
            key: "id", // Columna referenciada
        },
        onUpdate: "CASCADE", // Actualiza en cascada si el ID del usuario cambia
        onDelete: "CASCADE", // Elimina la tarea si el usuario es eliminado
    },
    completed: {
        type: DataTypes.BOOLEAN, // El atributo completed será un booleano
        defaultValue: false, // Valor por defecto es 'false', indicando que la tarea no está completada
    },
}, {
    timestamps: true, // Incluye columnas createdAt y updatedAt
});

export default Task;
