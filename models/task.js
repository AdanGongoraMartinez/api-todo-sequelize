import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Task = sequelize.define("taks", {
    title: {
        type: DataTypes.STRING,
        allowNull: false, // No permite valores nulos
        validate: {
            notEmpty: true, // Asegura que no sea una cadena vacía
        },
    }
}, {
    timestamps: true, // Incluye columnas createdAt y updatedAt
});

export default Task;
