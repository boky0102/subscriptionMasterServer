
import express from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { validateLoginData } from '../srevices/user.service';
import User from '../modules/user';

const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const userData : User = {
            username: req.body.username,
            password: req.body.password
        };

        


        const jwtToken = await validateLoginData(userData);

        res.cookie("jwt", jwtToken, {
            httpOnly: true,
            /* secure: true,  PRODUCTION*/ 
            maxAge: 900000
        }).send();
        
    } catch(err){
        next(err);
    }
    
    
};

export default login;