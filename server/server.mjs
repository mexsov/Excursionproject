import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { connectDB } from './db/postgresConnection.mjs';
import mainRouter from './routes/mainRouter.mjs';
import { LogInfo, LogError } from './Logger/Logger.mjs';

const app = express();

// Server configuration
const startServer = async () => {
	try {
		// Connecting to database
		await connectDB();

		app.use(cors());

		// Configuring for json body requests
		app.use(express.json());

		// API routes
		app.use('/api', mainRouter);

		// Configuring port
		const port = process.env.PORT;

		// Starting server
		app.listen(port, () => {
			// Logging
			LogInfo(`Server is running and listening on port ${port}.`);
		});

	} catch (error) {
		LogError("Error occured while starting a server.", error);

		process.exit(1);
	}
};

// Starting server
startServer();