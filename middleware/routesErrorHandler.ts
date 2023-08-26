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
        console.log("USLO U ERROR");
        if(error instanceof Error){
            next(error);
        } else{
            res.statusMessage = error.message;
            res.status(error.statusCode);
            res.send();
        }
        
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
    
    
    
}


export async function defaultErrorHandler(error: any, req: Request, res: Response, next: NextFunction){
    console.log("Uslo u default error");
    console.log(error.message);
    res.statusMessage = error.message;
    res.status(500);
    res.send();
}