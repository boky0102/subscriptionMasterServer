import express ,{ NextFunction } from "express";

async function homeController(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        /* if(req.userId && typeof(req.userId) === "string"){

            const user = await prisma.user.findFirst(
                {
                    where: {
                        id: req.userId
                    }
                }
            )
            if(user){
                console.log(user);
                res.send(user.username);

            } else{
                console.log("USER WITH GIVEN ID ISN'T FOUND");
                res.status(404).send();
            }

        } else{
            console.log("ID FOR USER ISN'T PROVIDED");
            res.status(404).send();
        } */



    } catch(error){
        console.log(error);
        res.status(500).send();
    }
}

export default homeController;