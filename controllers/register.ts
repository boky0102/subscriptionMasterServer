import { NextFunction } from "express";
import express from "express";
const asyncHandler = require('express-async-handler');
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";

import User from "../modules/user";
import { collections } from "../srevices/database.service";



const register = async (req: express.Request,res: express.Response,next: express.NextFunction) => {
    try{
        
        const newUser: User = {
            username: req.body.username,
            password: req.body.password
        }

        if(req.body){
            const newUserStatus = await collections.user?.insertOne(newUser);
            console.log(newUserStatus);
            newUserStatus ? 
                res.status(200).send() :
                res.status(500).send();
            
        }
    
    } catch(err){
        console.log(err)
        res.status(400).send();
    }
    
    
}

export default register;