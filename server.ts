import express , {Express, Request, Response} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import register from './controllers/register';
import login from './controllers/login';
import isAuthenticated from './middleware/authentication';

const router = express.Router();




var corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
//CONNECTING TO DB

export const prisma = new PrismaClient();

const port = 3000


const app: Express = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", isAuthenticated, async (req: Request,res: Response) => {
    console.log(req.userId);
    res.status(200).send();
})


router.post("/register", register);
router.post("/login", login);
app.use("/", router);



app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
})