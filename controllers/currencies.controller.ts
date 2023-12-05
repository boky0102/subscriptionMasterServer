import {Request, Response, NextFunction} from "express";
import currencyRates from "../currencies.json";
import { AppError } from "../middleware/routesErrorHandler";
export function getCurrencyRatesController(req: Request, res: Response, next: NextFunction){
    try{
        if(Object.keys(currencyRates).length > 0){
            res.send(currencyRates);
        } else {
            throw new AppError(404, "File not found on server");
        }
    } catch(error){
        next(error);
    }
    
}