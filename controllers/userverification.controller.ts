import { NextFunction, Request, Response } from "express";
import { validateEmailVerification } from "../srevices/user.service";
import { AppError } from "../middleware/routesErrorHandler";

export async function emailVerificationController(req: Request, res: Response, next: NextFunction){
    try{

        const {token, username} = req.params;
        const verified = await validateEmailVerification(username, token);
        if(verified){
            res.status(200).send();
        }else{
            throw new AppError(400, "Cant validate email");
        }

    }catch(error){
        next(error);
    }
}