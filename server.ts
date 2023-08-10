import express , {Express, Request, Response} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import register from './controllers/register';
import login from './controllers/login';

const router = express.Router();




var corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:5173'
}
//CONNECTING TO DB

export const prisma = new PrismaClient();

const port = 3000


const app: Express = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", async (req: Request,res: Response) => {
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
})


router.post("/register", register);
router.post("/login", login);
app.use("/", router);


/* app.post("/register", async (req: Request, res: Response) => {
    try{
        register();

    } catch(err){
        console.log(err);
        res.status(500).send();
    }
}) */


app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
})