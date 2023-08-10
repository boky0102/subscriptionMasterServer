
import express from 'express';
import { prisma } from '../server';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        if(req.body){
            const { username, password } = req.body;
            const user = await prisma.user.findFirst({
                where: {
                    username: username
                }
            });
            if(user){
                const passwordCheck = await bcrypt.compare(password, user.password);
                if(passwordCheck){
                    if(process.env.JWT_SECRET){

                        const token = await jwt.sign(user.id, process.env.JWT_SECRET);
                        res.send(token);

                    } else{
                        throw(new Error("jwt signature isn't set up"));
                        res.status(500).send();
                        
                    }
                    
                } else{
                    res.statusMessage = "Incorrect password";
                    res.status(400).send();
                }

            } else{
                res.statusMessage = "Username doesn't exist";
                res.status(400).send();
            }

        }
    } catch(err){
        console.log(err);
    }
    
    
};

export default login;