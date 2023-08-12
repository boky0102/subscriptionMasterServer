import { Request, Response, NextFunction } from "express";
import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

async function isAuthenticated (req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        const userToken = req.header("cookie")?.split("=")[1];
        if(userToken && process.env.JWT_SECRET){
            jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
                if(err){
                    console.log(err)
                    res.status(400).send();
                } else{
                    if(decoded){
                        req.userId = decoded;
                        next();
                    }
                }
            })
        } else{
            res.statusMessage = "cookie isn't set up";
            res.status(400).send();
        }


    } catch(error){
        console.log(error);
        res.status(500).send();
    }
    
}

export default isAuthenticated;