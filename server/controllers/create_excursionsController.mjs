import { validationResult } from "express-validator";

import tasksModel from "../models/tasksModel.mjs";
import project_workersModel from "../models/project_workersModel.mjs";
import userModel from "../models/userModel.mjs"
import { ADMIN, OWNER } from "../cfg/Roles.mjs";

const createExcursionController = {

    createCreateExcursion: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json("Unauthorized access");
            }

            const { name, image_data, duration_minutes, rating, price } = req.body;


            const createExcursion = {
                name,
                image_data,
                duration_minutes,
                rating,
                price
            };

            const result = await createExcursionModel.createCreateExcursion(createExcursion);

            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    },
};

export default createExcursionController;