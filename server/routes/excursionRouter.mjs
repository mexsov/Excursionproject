import express from 'express';
import dotenv from 'dotenv/config';

import AuthMiddleware from '../middleware/authMiddleware.mjs';

import excursionController from '../controllers/excursionsController.mjs';

import { createExcursionValidationSchema } from '../validators/ExcursionValidator.mjs';

// dotenv.config();

console.log(excursionController.createExcursion); // Should log a function
// console.log(createcreateExcursionValidationSchema); // Should log a validation schema or function

const router = express.Router();



router.post('/create', [AuthMiddleware, createExcursionValidationSchema], excursionController.createExcursion);





export default router;