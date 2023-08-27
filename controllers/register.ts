import express from "express";
const asyncHandler = require('express-async-handler');

import User from "../modules/user";
import { collections } from "../srevices/database.service";
import { AppError } from "../middleware/routesErrorHandler";
import { createUser } from "../srevices/user.service";




const register = async (req: express.Request,res: express.Response,next: express.NextFunction) => {
    try{
        
        const newUser: User = {
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        const userCreated = await createUser(newUser);
        res.status(200).send();
    
    } catch(err){
        next(err);
    }
    
    
}

export default register;