
import { pool } from "../db/postgresConnection.mjs";

const createExcursionModel = {

    createCreateExcursionModel: async (createExcursion) => {
        const {name, image_data, duration_minutes, rating, price } = createExcursion;

        const result = await pool.query("INSERT INTO reateExcursion (name, image_data, duration_minutes, rating, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, image_data, duration_minutes, rating, price ]);

        return result.rows[0];
    },
};

export default createExcursionModel;