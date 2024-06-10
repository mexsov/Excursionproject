import { pool } from '../db/postgresConnection.mjs';

// Model for creating project workers
const project_workersModel = {
    createProjectWorker: async (pWorker) => {
        const { user_id, create_excursions_id, role } = pWorker;

        // Sending query to database
        const result = await pool.query("INSERT INTO project_workers (user_id, create_excursions_id, role) VALUES ($1, $2, $3) RETURNING *",
            [user_id, create_excursions_id, role]);

        return result.rows[0];
    },

    getProjectWorker: async (user_id, create_excursions_id) => {
        const result = await pool.query("SELECT * FROM project_workers WHERE user_id=$1 AND create_excursions_id=$2",
            [user_id, create_excursions_id]);

        return result.rows[0];
    },

    getProjectWorkersByUserId: async (user_id) => {
        const result = await pool.query("SELECT * FROM project_workers WHERE user_id=$1",
            [user_id]);

        return result.rows;
    },
    getProjectWorkersByProjectId: async (create_excursions_id) => {
        const result = await pool.query("SELECT user_id, create_excursions_id, role, username FROM project_workers LEFT JOIN users ON project_workers.user_id = users.id WHERE create_excursions_id=$1",
            [create_excursions_id]);

        return result.rows;
    },
    deleteProjectWorker: async (user_id, create_excursions_id) => {
        const result = await pool.query("DELETE FROM project_workers WHERE user_id=$1 AND create_excursions_id=$2",
            [user_id, create_excursions_id]);
    },

    updateProjectWorkerRole: async (pWorker) => {
        const { user_id, create_excursions_id, role } = pWorker;
        const result = await pool.query("UPDATE project_workers SET role=$1 WHERE user_id=$2 AND create_excursions_id=$3 RETURNING *",
            [role, user_id, create_excursions_id]);

        return result.rows[0];
    }
};

export default project_workersModel;