import pg from "pg";
import dotenv from "dotenv";
import { LogError, LogInfo } from "../Logger/Logger.mjs";

dotenv.config();

const { Pool } = pg;

// Configuring database connection
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export const connectDB = () => {
  return new Promise((resolve, reject) => {

    // Connecting to the database
    pool.connect((err) => {
      if (err) {
        LogError("Error occured while connecting to the database.", err);
        reject();
      }
      else {
        LogInfo("Database connected successfully.");
        resolve();
      }
    });
  });
};
