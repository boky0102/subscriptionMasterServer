import express, {Express, Request, Response} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

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
        const userData = req.body;
        console.log(req.body);
        res.status(200).send();

    } catch(err){
        console.log(err);
    }
})


app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
})