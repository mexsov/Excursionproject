import { checkSchema } from 'express-validator';
import { USER, ADMIN, OWNER } from '../cfg/Roles.mjs';
import userModel from "../models/userModel.mjs";

export const updatePWorkerValidationSchema = checkSchema({
    role: {
        custom: {
            options: async (value) => {
                if (value === OWNER) {
                    throw new Error("Imposible action");
                }
                if (value != USER && value != ADMIN) {
                    throw new Error("Specified role does not exist in the system");
                }
            },
        }
    },
    user_id: {
        isInt: {
            options: { min: 1 },
            errorMessage: "user_id must be a valid positive integer"
        }
    },
    project_id: {
        isInt: {
            options: { min: 1 },
            errorMessage: "project_id must be a valid positive integer"
        }
    }
});

export const createPWorkerValidationSchema = checkSchema({
    username: {
        isLength: {
            options: { min: 3, max: 20 },
            errorMessage: 'Username must be at least 3 characters with a max of 20 characters',
        },
        notEmpty: {
            errorMessage: 'Username cannot be empty',
        },
        isString: {
            errorMessage: 'Username must be a string!',
        },
        custom: {
            options: async (value) => {
                const existingUser = await userModel.getUserByUsername(value);
                if (!existingUser) {
                    throw new Error('User does not exist with the given username');
                }
            },
        }
    },
    project_id: {
        isInt: {
            options: { min: 1 },
            errorMessage: "project_id must be a valid positive integer"
        }
    }
});

export const deletePWorkerValidationSchema = checkSchema({
    user_id: {
        isInt: {
            options: { min: 1 },
            errorMessage: "user_id must be a valid positive integer"
        }
    },
    project_id: {
        isInt: {
            options: { min: 1 },
            errorMessage: "project_id must be a valid positive integer"
        }
    }
});