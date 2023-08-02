import express, {Express, Request, Response} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

//CONNECTING TO DB

const prisma = new PrismaClient();

const port = 3000


const app: Express = express();


app.get("/", async (req: Request,res: Response) => {
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
})


app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
})