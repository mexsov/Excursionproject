import { validationResult } from "express-validator";

import project_workersModel from "../models/project_workersModel.mjs";
import userModel from "../models/userModel.mjs";

import { ADMIN, OWNER, USER } from "../cfg/Roles.mjs";

const projectWorkersController = {
    getPWorkersByUserId: async (req, res, next) => {
        try {
            const id = req.params.user_id;

            const result = await project_workersModel.getProjectWorkersByUserId(id);

            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    },
    getPWorkerByUserAndProjectId: async (req, res, next) => {
        try {
            const { user_id, project_id } = req.params;

            const result = await project_workersModel.getProjectWorker(user_id, project_id);

            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    },
    getPWorkersByProjectId: async (req, res, next) => {
        try {
            const id = req.params.project_id;

            const result = await project_workersModel.getProjectWorkersByProjectId(id);

            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    },

    createPWorker: async (req, res, next) => {
        try {

            const { username, project_id } = req.body;

            if (!req.user) {
                return res.status(401).json("Unauthorized access");
            }

            const currWorker = await project_workersModel.getProjectWorker(req.user.id, project_id);

            if (!currWorker) {
                return res.status(401).json("You dont have privileges to perform this action");
            }

            const { role } = currWorker;

            if (role == USER) {
                return res.status(401).json("You dont have privileges to perform this action");
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id: user_id } = await userModel.getUserByUsername(username);

            const ifExists = await project_workersModel.getProjectWorker(user_id, project_id);
            if (ifExists) {
                return res.status(400).json({
                    errors: [{
                        path: "username",
                        msg: "User already exists in the project"
                    }]
                });
            }

            const pWorker = {
                role: USER, user_id, project_id
            };

            const result = await project_workersModel.createProjectWorker(pWorker);

            return res.status(201).json(result);

        }
        catch (error) {
            next(error);
        }
    },

    updatePWorker: async (req, res, next) => {
        try {

            const { role, user_id, project_id } = req.body;

            if (!req.user) {
                return res.status(401).json("Unauthorized access");
            }

            const currentUserRole = await project_workersModel.getProjectWorker(req.user.id, project_id);
            const otherUserRole = await project_workersModel.getProjectWorker(user_id, project_id);

            if (!currentUserRole) {
                return res.status(401).json("You dont have privileges to perform this action");
            }

            if (!otherUserRole) {
                return res.status(400).json("This user is a project worker");
            }

            const { role: currentRole } = currentUserRole;
            const { role: otherRole } = otherUserRole;

            if (otherRole === OWNER) {
                return res.status(401).json("You dont have privileges to perform this action");
            }

            if (currentRole == USER) {
                return res.status(401).json("You dont have privileges to perform this action");
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const pWorker = {
                role, user_id, project_id
            };

            const result = await project_workersModel.updateProjectWorkerRole(pWorker);

            return res.status(200).json(result);

        }
        catch (error) {
            next(error);
        }
    },

    deletePWorker: async (req, res, next) => {
        try {
            const { user_id, project_id } = req.body;

            if (!req.user) {
                return res.status(401).json("Unauthorized access");
            }

            const currentUserRole = await project_workersModel.getProjectWorker(req.user.id, project_id);
            const otherUserRole = await project_workersModel.getProjectWorker(user_id, project_id);

            if (!currentUserRole) {
                return res.status(401).json("You dont have privileges to perform this action");
            }

            if (!otherUserRole) {
                return res.status(400).json("This user is not a project worker");
            }

            const { role: currentRole } = currentUserRole;
            const { role: otherRole } = otherUserRole;

            if (otherRole === OWNER) {
                return res.status(401).json("You dont have privileges to perform this action");
            }

            if (currentRole == USER && currentUserRole.id !== otherUserRole.id) {
                return res.status(401).json("You dont have privileges to perform this action");
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            await project_workersModel.deleteProjectWorker(user_id, project_id);

            return res.status(200).json();

        }
        catch (error) {
            next(error);
        }
    }
}

export default projectWorkersController;