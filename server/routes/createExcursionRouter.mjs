import express from 'express';
import dotenv from 'dotenv/config';

import AuthMiddleware from '../middleware/authMiddleware.mjs';

import createExcursionController from '../controllers/create_excursionsController.mjs';

import { createcreateExcursionValidationSchema } from '../validators/createExcursionValidator.mjs';

const router = express.Router();



router.post('/', [AuthMiddleware, createcreateExcursionValidationSchema], createExcursionController.createcreateExcursion);





export default router;