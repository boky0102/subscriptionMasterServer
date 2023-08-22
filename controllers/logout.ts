import express from 'express';

async function logoutController(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        res.clearCookie('jwt');
        res.send();
    } catch(error){
        console.log(error);
        res.status(500).send();
    }
    

    
}

export default logoutController;