
import { pool } from "../db/postgresConnection.mjs";

const excursionModel = {

    createExcursionModel: async (excursion) => {
        const {name, image_data, duration_minutes, rating, price } = excursion;

        const result = await pool.query("INSERT INTO create_excursion (name, image_data, duration_minutes, rating, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, image_data, duration_minutes, rating, price ]);

        return result.rows[0];
    },
};

export default excursionModel;