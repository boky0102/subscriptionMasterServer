import { Response, Request, NextFunction } from "express";
import { AppError } from "../middleware/routesErrorHandler";
import User from "../modules/user";
import { collections } from "./database.service";
import bcrypt from "bcrypt";


export async function validateUserInput(req: Request, res: Response, next: NextFunction){
    try{

        if(req.body.username && req.body.password && req.body.confirmPassword){
            
            const newUser: User = {
                username: req.body.username,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            }

            if(newUser.password === newUser.confirmPassword){
                
                if( newUser.username.length < 4 ){
                    throw new AppError(400, "Username must be longer than 3 characters");
                } else if( newUser.password.length < 7 ){
                    throw new AppError(400, "Password needs to be logner than 7 characters")
                } else{
                    next();
                }

            } else{
                throw new AppError(400, "Passwords must match");
            }


        } else{
            throw new AppError(400, "All fields are required");
        }

    } catch(error){
        next(error);
    }
}

export async function createUser(userData: User){
    
    const userExists = await collections.user?.findOne({
        username: userData.username
    });

    if(!userExists){

        const hash = await bcrypt.hash(userData.password, 10);
        const insertedUser = await collections.user?.insertOne({
            username: userData.username,
            password: hash
        })
        

    } else {
        throw new AppError(400, "User already exists");
    };
    
}




