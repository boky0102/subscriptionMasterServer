import 'dotenv/config';
import * as mongoDB from "mongodb";

export const collections: { user?: mongoDB.Collection } = {}

export async function connectToDatabase(){
    if(process.env.DATABASE_URL){
        
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DATABASE_URL);
        
        await client.connect();

        const db: mongoDB.Db = client.db("subscription");

        const userCollection: mongoDB.Collection = db.collection("user");

    collections.user = userCollection;
        

    } else{
        console.log("Database url isn't set up in .env file");
    }
    

}
