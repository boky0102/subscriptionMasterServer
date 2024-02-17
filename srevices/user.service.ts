import { Response, Request, NextFunction } from "express";
import { AppError } from "../middleware/routesErrorHandler";
import User from "../modules/user";
import { collections } from "./database.service";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ObjectId } from "mongodb";
import { JwtPayload } from "jsonwebtoken";



type UserColorData = {
    [key in subscriptionCategories]: string;
};

type subscriptionCategories =
     | 'Streaming'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';




export async function validateUserInput(req: Request, res: Response, next: NextFunction){
    try{

        if(req.body.username && req.body.password && req.body.confirmPassword){
            const newUser: User = {
                username: req.body.username,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            }

            if(newUser.password === newUser.confirmPassword){
                
                if( newUser.username.length < 4 ){
                    throw new AppError(400, "Username must be longer than 3 characters");
                } else if( newUser.password.length < 7 ){
                    throw new AppError(400, "Password needs to be logner than 7 characters")
                } else{
                    next();
                }

            } else{
                throw new AppError(400, "Passwords must match");
            }


        } else{
            throw new AppError(400, "All fields are required");
        }

    } catch(error){
        next(error);
    }
}


export async function createUser(userData: User){
    
    const userExists = await collections.user?.findOne({
        username: userData.username
    });

    if(!userExists){
        const COLORS = ['#7E57F2', '#F073BE', '#63ABFA', '#EDA751', '#79F56E', '#F4F570', '#F5DE6C', '#59F5CA'];
        const categories: subscriptionCategories[] = [
            'Streaming',
            'Gaming',
            'Clothing',
            'Food',
            'Utility',
            'Education',
            'Software',
            'Other',
       ];

       const categoriesColorsArray: UserCategoryColors[] = [];
       categories.forEach((category, index) => {
            const categoryObject: UserCategoryColors = {
                category: category,
                color: COLORS[index]
            }
            categoriesColorsArray.push(categoryObject);
       })

        const hash = await bcrypt.hash(userData.password, 10);
        const insertedUser = await collections.user?.insertOne({
            username: userData.username,
            password: hash,
            userCategoryColors: categoriesColorsArray,
            preferredCurrency: "USD"
        } as User);
        

    } else {
        throw new AppError(400, "User already exists");
    };
    
}


export async function validateLoginData(userData: User){
    const currentUser = await collections.user?.findOne({username: userData.username});
    if(currentUser){
        
        const isUserValid = await bcrypt.compare(userData.password, currentUser.password);
        if(isUserValid){
            if(process.env.JWT_SECRET){
                const token = await jwt.sign({userId: currentUser._id}, process.env.JWT_SECRET);
                return token;
            } else{
                throw new AppError(500, "Server config error");
            }
            

        }else{
            throw new AppError(400, "Wrong password");
        }

    } else{
        throw new AppError(400, "User doesn't exist");
    }

}

async function validateEmail(email: string){
    const regExp = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regExp.test(email);
}

export async function updateUserEmail(reqUserId: JwtPayload, email: string){
    try{
        const validEmail = await validateEmail(email);
        const userId = new ObjectId(reqUserId.userId);

        if(validEmail){
            console.log("INSETING ", email, userId);
            const user = await collections.user?.updateOne({
                _id: userId
            }, {
                "$set" : {
                    email: email
                }
            });
            if(user){
                return true
            } else{
                throw new AppError(500, "User data couldn't be updated")
            }

        } else {
            throw new AppError(400, "Bad request - invalid email address");
        }


    } catch(error){
        console.log(error);
        throw new AppError(500, "Internal server error");
    }
    

}

export async function updatePreferedCurrency(jwtPayload: JwtPayload ,currency: currencies){
    
    const {userId} = jwtPayload;
    const updated = await collections.user?.updateOne({_id: userId}, {
        $set: {
            preferredCurrency: currency
        }
    });
    if(updated?.acknowledged){
        return true;
    } else throw new AppError(500, "Internal server error - can't update user");
}

export async function updateUserColors(jwtPayload: JwtPayload, userColors: UserColorData){
    const {userId} = jwtPayload;

    const userIdDB = new ObjectId(userId);

    const user = await collections.user?.findOne<User>({_id: userIdDB});
    
    const adjustedColorsArray = user?.userCategoryColors?.map((category) => {
        if(userColors[category.category]){
            return (
                {
                    ...category,
                    color: userColors[category.category]
                }
            );
        } else {
            return category;
        }
    })

    
    const updatedUser = await collections.user?.updateOne({_id: userIdDB}, {
        $set: {
            userCategoryColors: adjustedColorsArray
        }
    });


    if(updatedUser?.modifiedCount){
        return true
    } else{
        throw new AppError(500, "Internal server error - updating color");
    }

    
    

    
}





