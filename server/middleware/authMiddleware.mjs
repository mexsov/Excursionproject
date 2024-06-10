import jwt from 'jsonwebtoken';
import 'dotenv/config';

import userModel from '../models/userModel.mjs';


// Middlware that check if user is authenticated and checks his role based on the AuthMiddleware role argument
export default async function AuthMiddleware(req, res, next){
    try{
        // Checking if token is provided in the Authorization header
        const token = req.get("Authorization").split(' ')[1];
        if(!token){
            return res.status(401).json("Unauthorized access");
        } 

        // Checking if the token is valid
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(!payload){
            return res.status(401).json("Unauthorized access");
        }
            
        // Checking if user is valid
        const user = await userModel.getUserById(payload.user.id);
        if(!user){
            throw Error("User no longer exists");
        }

            // Providing user id for the next in the pipeline
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json("Unauthorized access");
    }
}
