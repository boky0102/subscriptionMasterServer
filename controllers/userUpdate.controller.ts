import { Request, Response, NextFunction } from "express";
import { updateUserEmail } from "../srevices/user.service";
import { AppError } from "../middleware/routesErrorHandler";
import { JwtPayload } from "jsonwebtoken";

export async function userUpdateController(req: Request, res: Response, next: NextFunction){
    try{
        const userId = req.userId as JwtPayload;
        if(req.userId){
            const userUpdated = await updateUserEmail(userId,req.body.email);
            if(userUpdated){
                console.log("User updated", userUpdated);
                res.status(200).send();
            } else {
                throw new AppError(500, "Didnt manage to update user on server");
            }
        } else{
            throw new AppError(400, "User not authenticated properly");
        }
    } catch(error){
        next(error)
    }
    
    
}