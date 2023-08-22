import express from 'express';


async function addSubscription(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        
        /* if(req.userId && typeof req.userId === "string"){

            const newSubscription = await prisma.subscription.create({
                data: {
                    renewalDate: req.body.renewalDate,
                    startTime: req.body.startDate,
                    chargeAmount: req.body.chargeAmount,
                    subscriptionName: req.body.subscriptionName
                }
            })

            const updatedUser = await prisma.user.findUnique({
                where: {
                    id: req.userId
                }
            });

            
            

        }

        res.status(200).send(); */

        

        

    } catch(error){
        console.log(error)
        res.status(500).send();
    }
}

export default addSubscription;