import { Request, Response, NextFunction } from "express";
import { isNoSubstitutionTemplateLiteral } from "typescript";

export class AppError extends Error{
    statusCode: number;
    constructor(
        statusCode: number,
        message: string
    ){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }

}

export async function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    try{

        if(!error.statusCode){   //Checks if error has statusCode property which is undefined in defualt Error class
            next(error);
        } else{
              // If error is of type AppError
            res.statusMessage = error.message;
            res.status(error.statusCode);
            res.send();
        }
        
    } catch(err){
        res.status(500).send();
    }
    
    
}


export async function defaultErrorHandler(error: any, req: Request, res: Response, next: NextFunction){
    console.log("INTERNAL SERVER ERROR", error);
    res.statusMessage = error.message;
    res.status(500);
    res.send();
}