// import { validationResult } from "express-validator";



// import userModel from "../models/userModel.mjs"
// import { ADMIN, OWNER } from "../cfg/Roles.mjs";

const excursionController = {

    createExcursion: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json("Unauthorized access");
            }

            // const pWorker = await project_workersModel.getProjectWorker(req.user.id, project_id);
            // if (!pWorker) {
            //     return res.status(401).json("You dont have privileges to perform this action");
            // }

            // const { role } = pWorker;
            // if (role != ADMIN && role != OWNER) {
            //     return res.status(401).json("You dont have privileges to perform this action");
            // }

            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }

            const { name, image_data, duration_minutes, rating, price } = req.body;


            const excursion = {
                name,
                image_data,
                duration_minutes,
                rating,
                price
            };

            const result = await excursionModel.createExcursion(excursion);

            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    },
};

export default excursionController;

// ---------------------------------new----------------------------

// const excursionController = {
//     createExcursion: async (req, res, next) => {
//         try {
//             // Ensure the user is authenticated
//             if (!req.user) {
//                 return res.status(401).json({ error: "Unauthorized access" });
//             }

//             // Destructure excursion data from the request body
//             const { name, image_data, duration_minutes, rating, price } = req.body;

//             // Validate required fields
//             if (!name || !image_data || !duration_minutes || !rating || !price) {
//                 return res.status(400).json({ error: "Missing required fields" });
//             }

//             // Validate data types and constraints
//             if (typeof duration_minutes !== 'number' || typeof rating !== 'number' || typeof price !== 'number') {
//                 return res.status(400).json({ error: "Invalid data types for duration_minutes, rating, or price" });
//             }

//             // Construct the excursion object
//             const excursion = {
//                 name,
//                 image_data,
//                 duration_minutes,
//                 rating,
//                 price
//             };

//             // Save the new excursion to the database
//             const result = await excursionModel.createExcursion(excursion);

//             // Respond with the created excursion
//             return res.status(201).json(result);
//         } catch (error) {
//             // Pass the error to the error handler middleware
//             next(error);
//         }
//     },
// };

// export default excursionController;
