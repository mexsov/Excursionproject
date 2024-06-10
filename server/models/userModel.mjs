import { pool } from '../db/postgresConnection.mjs';

// Model for managing users
const userModel = {

	// User creation
	createUser: async (newUser) => {
		const { username, password, email, registered_on } = newUser;

		// Sending query to database
		const result = await pool.query('INSERT INTO users (username, password, email, registered_on) VALUES ($1, $2, $3, $4) RETURNING *',
			[username, password, email, registered_on]);

		return result.rows[0];
	},

	// Getting user from email
	getUserByEmail: async (email) => {
		// Sending query to database
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

		return result.rows[0];
	},

	// Getting user from username
	getUserByUsername: async (username) => {
		// Sending query to database
		const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

		return result.rows[0];
	},

	// Getting user from username or email 
	login: async (login) => {
		// Sending query to database
		const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [login, login]);

		return result.rows[0];;
	},

	// Getting user from id
	getUserById: async (id) => {
		// Sending query to database
		const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

		return result.rows[0];
	},

	searchUsername: async (search) => {
		const result = await pool.query("SELECT username FROM users WHERE username LIKE $1||'%' LIMIT 20", [search]);

		return result.rows;
	}

};

export default userModel;