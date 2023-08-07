import express, {Express, Request, Response} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcrypt';



var corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:5173'
}
//CONNECTING TO DB

const prisma = new PrismaClient();

const port = 3000


const app: Express = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", async (req: Request,res: Response) => {
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
})

app.post("/register", async (req: Request, res: Response) => {
    try{
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
                        }
                    })
                    res.status(200).send();

                }
                
            }
        })

    } catch(err){
        console.log(err);
        res.status(500).send();
    }
})


app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
})