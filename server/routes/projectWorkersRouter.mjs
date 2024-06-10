import express from 'express';
import dotenv from 'dotenv/config';


import AuthMiddleware from '../middleware/authMiddleware.mjs';

import projectWorkersController from '../controllers/projectWorkersController.mjs';

import { updatePWorkerValidationSchema, deletePWorkerValidationSchema,
         createPWorkerValidationSchema } from '../validators/projectWorkerValidator.mjs';

const router = express.Router();

router.get('/user/:user_id', AuthMiddleware, projectWorkersController.getPWorkersByUserId);
router.get('/create_excursions/:create_excursions_id', AuthMiddleware, projectWorkersController.getPWorkersByProjectId);
router.get("/:user_id/:create_excursions_id", AuthMiddleware, projectWorkersController.getPWorkerByUserAndProjectId);
router.post("/", [AuthMiddleware, createPWorkerValidationSchema], projectWorkersController.createPWorker);
router.put("/", [AuthMiddleware, updatePWorkerValidationSchema], projectWorkersController.updatePWorker);
router.delete("/", [AuthMiddleware, deletePWorkerValidationSchema], projectWorkersController.deletePWorker);


export default router;