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
import { validateUserInput } from './srevices/user.service';
import { deleteSubscription, getSubscriptionsController, putSubscriptionNotification } from './controllers/subscription.controller';
import cron from 'node-cron';
import { getAllSubscriptionsRenewalSoon } from './srevices/subscription.service';
import { userUpdateController } from './controllers/userUpdate.controller';
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
        cron.schedule("00 10 * * *", () => {
            console.log("ITS TIME");
            getAllSubscriptionsRenewalSoon();
        } )  // SCHEDULED EVENET EACH DAY AT 1:30 DURING NIGHT -> NOTIFICATIONS PUSH TO USERS


        console.log("database connected");
        app.use(cors(corsOptions));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));

        router.get("/", isAuthenticated, homeController);
        router.post("/register", validateUserInput, register);
        router.post("/login", login);
        router.get("/logout", isAuthenticated, logoutController);
        router.post("/newsubscription", isAuthenticated , addSubscription);
        router.get("/subscriptions", isAuthenticated, getSubscriptionsController);
        router.put("/subscription", isAuthenticated, putSubscriptionNotification);
        router.delete("/subscription/:subscriptionId", isAuthenticated, deleteSubscription);
        router.put("/settings", isAuthenticated ,userUpdateController);
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

