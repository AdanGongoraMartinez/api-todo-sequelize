// import pkg from 'pg';
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
});

sequelize
    .sync()
    .then(() => { console.log("Datbase connected") })
    .catch((err) => {
        console.error("Error connecting to the database:", err)
    });

export default sequelize;
