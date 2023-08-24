import express from "express";
const asyncHandler = require('express-async-handler');
import bcrypt from 'bcrypt';

import User from "../modules/user";
import { collections } from "../srevices/database.service";



const register = async (req: express.Request,res: express.Response,next: express.NextFunction) => {
    try{
        
        const newUser: User = {
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        if(req.body){

            if(newUser.password === newUser.confirmPassword){

                const userExists = await collections.user?.findOne({username: newUser.username});
                if(!userExists){
                
                    const hash = await bcrypt.hash(newUser.password, 10);
                    if(hash){

                        const newHashedUser: User = {
                            username: req.body.username,
                            password: hash
                        }
                        const userCreated = await collections.user?.insertOne(newHashedUser);
                        res.status(200).send();

                    } else{
                        res.status(500).send();
                    }


                } else {

                    res.statusMessage = "User already exists";
                    res.status(404).send();
                }


            } else{
                res.statusMessage = "Passwords don't match";
                res.status(400).send();
            }
            

            
        } else{
            res.status(400).send();
        }
    
    } catch(err){
        console.log(err)
        res.status(400).send();
    }
    
    
}

export default register;