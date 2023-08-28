import express from 'express';


async function addSubscription(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        

        

    } catch(error){
        console.log(error)
        res.status(500).send();
    }
}

export default addSubscription;