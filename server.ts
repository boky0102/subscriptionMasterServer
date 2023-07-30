import express, {Express, Request, Response} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';


//CONNECTING TO DB
async function connectDB(){

    if(process.env.DATABASE_URL){
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DATABASE CONNECTED SUCCESSFULLY");
    } else{
        throw new Error("env variable DATABASE_URL is undefined, please reconfigure your .env file");
    }
}

connectDB().catch(e => console.log(e.message));


const port = 3000


const app: Express = express();


app.get("/", (req: Request,res: Response) => {
    res.send("Test is working")
})


app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
})