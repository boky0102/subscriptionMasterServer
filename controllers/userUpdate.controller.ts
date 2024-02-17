import { Request, Response, NextFunction } from "express";
import { updatePreferedCurrency, updateUserColors, updateUserEmail } from "../srevices/user.service";
import { AppError } from "../middleware/routesErrorHandler";
import { JwtPayload } from "jsonwebtoken";

export async function userUpdateController(req: Request, res: Response, next: NextFunction){
    try{
        const userId = req.userId as JwtPayload;
        if(req.userId){
            const userUpdated = await updateUserEmail(userId,req.body.email);
            if(userUpdated){
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

export async function changeCurrencyController(req: Request, res: Response, next: NextFunction){
    try{
        const userId = req.userId as JwtPayload;
        const prefferedCurrency = req.body.preferredCurrency;
        const updated =  await updatePreferedCurrency(userId, prefferedCurrency);
        if(updated){
            res.status(200).send();
        } else{
            throw new AppError(500, "Can't update user");
        }
    } catch(error){
        next(error);
    }
    

}


export async function changeUserColorController(req: Request, res: Response, next: NextFunction){
    try{
        const userId = req.userId as JwtPayload;
        const userColorData = req.body;
        console.log("Request data" , userColorData);
        await updateUserColors(userId, userColorData);
        res.status(200).send();


    }catch(error){
        next(error);
    }
}