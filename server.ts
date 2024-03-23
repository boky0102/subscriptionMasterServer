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
import { deleteSubscription, getSubscriptionsController, putSubscriptionNotification, subscriptionStop } from './controllers/subscription.controller';
import cron from 'node-cron';
import { getAllSubscriptionsRenewalSoon } from './srevices/subscription.service';
import { changeCurrencyController, changeUserColorController, userUpdateController } from './controllers/userUpdate.controller';
import { getCurrencyData } from './utility/currency.utility';
import { getCurrencyRatesController } from './controllers/currencies.controller';
import mailgun from 'mailgun-js';
import { emailVerificationController } from './controllers/userverification.controller';
const router = express.Router();




var corsOptions: cors.CorsOptions = {
    origin: [ "http://192.168.178.4:5173", 'http://localhost:5173'],
    credentials: true
}
//CONNECTING TO DB

const port = 3000


const app: Express = express();






connectToDatabase()
    .then(() => {
        cron.schedule("42 11 * * *", () => {
            getAllSubscriptionsRenewalSoon();
            /* getCurrencyData(); */
            
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
        router.put("/subscription-stop", isAuthenticated, subscriptionStop);
        router.get("/currencies", isAuthenticated, getCurrencyRatesController);
        router.post("/preferredCurrency", isAuthenticated, changeCurrencyController);
        router.post("/change-color", isAuthenticated, changeUserColorController);
        router.get("/verification/:token-:username", emailVerificationController);
    
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

