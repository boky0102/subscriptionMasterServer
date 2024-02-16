import { Request, Response, NextFunction } from "express";
import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AppError } from "./routesErrorHandler";

async function isAuthenticated (req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        const userToken = req.header("cookie")?.split("=")[1];
        if(userToken && process.env.JWT_SECRET){
            jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
                if(err){
                    throw new AppError(401, "Unauthorized");
                } else{
                    if(decoded){
                        req.userId = decoded;
                        next();
                    } else{
                        throw new AppError(500, "JWT DECODING ERROR");
                    }
                }
            })
        } else{
            throw new AppError(401, "Cookie isn't set up");
        }


    } catch(error){
        next(error);
    }
    
}

export default isAuthenticated;