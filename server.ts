import express , {Express, Request, Response} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import register from './controllers/register';
import login from './controllers/login';
import isAuthenticated from './middleware/authentication';
import homeController from './controllers/home';
import logoutController from './controllers/logout';
import addSubscription from './controllers/addSubscription';
import { connectToDatabase, collections } from './srevices/database.service';
import { defaultErrorHandler, errorHandler } from './middleware/routesErrorHandler';

const router = express.Router();




var corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
//CONNECTING TO DB

const port = 3000


const app: Express = express();

connectToDatabase()
    .then(() => {

        console.log("database connected");
        app.use(cors(corsOptions));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));

        app.get("/test", async (req: express.Request, res: express.Response) => {
            const users = await collections.user?.find({});
            if(users){
                res.status(404).send("No user")
            }
            res.status(200).send(users);
        })


        router.get("/", isAuthenticated, homeController);
        router.post("/register", register);
        router.post("/login", login);
        router.get("/logout", isAuthenticated, logoutController);
        router.post("/newsubscription", isAuthenticated , addSubscription);
        app.use("/", router);

        app.use(errorHandler);
        app.use(defaultErrorHandler);



        app.listen(port, () => {
            console.log(`Server running and listening on port ${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })

