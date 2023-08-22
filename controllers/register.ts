import { NextFunction } from "express";
import express from "express";
const asyncHandler = require('express-async-handler');
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";






const register = async (req: express.Request,res: express.Response,next: express.NextFunction) => {
    try{
        /* if(req.body){
            console.log("request");
            await bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if(err){
                    res.status(500).send();
                    throw(err);
                } else{
                    const checkIfUserExists = await prisma.user.findFirst({
                        where: {
                            username: req.body.username
                        }
                    })
                    if(checkIfUserExists){
                        res.statusMessage = "User already exists";
                        res.status(400).send();
                    } else{
                        await prisma.user.create({
                            data: {
                                username: req.body.username,
                                password: hash
                            
                        }})
                        res.status(200).send();
        
                    }
                    
                }
            })
    
        } */
    
    } catch(err){
        console.log(err)
        res.status(400).send();
    }
    
    
}

export default register;