import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { connectDB } from './db/postgresConnection.mjs';

import mainRouter from './routes/mainRouter.mjs';

import { LoggingMiddleware } from './middleware/LoggingMiddleware.mjs';
import { LogInfo, LogError } from './Logger/Logger.mjs';
import { ErrorHandlingMiddleware } from './middleware/ErrorHandlingMiddleware.mjs';
import { CaptureResMiddleware } from './middleware/CaptureResMiddleware.mjs';

const app = express();

// Server configuration
const startServer = async () => {
	try {
		// Connecting to database
		await connectDB();

		app.use(cors());

		// Configuring for json body requests
		app.use(express.json());

		app.use(CaptureResMiddleware);

		app.use(LoggingMiddleware);

		// API routes
		app.use('/api', mainRouter);


		app.use(ErrorHandlingMiddleware);


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