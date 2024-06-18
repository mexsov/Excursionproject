
import { pool } from "../db/postgresConnection.mjs";

const excursionModel = {

    createExcursionModel: async (newExcursion) => {
        const {name,  duration_minutes, rating, price } = newExcursion;

        const result = await pool.query("INSERT INTO create_excursion (name,  duration_minutes, rating, price) VALUES ($1, $2, $3, $4) RETURNING *",
        [name,  duration_minutes, rating, price ]);

        return result.rows[0];
    },
};

export default excursionModel;