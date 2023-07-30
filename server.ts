import express, {Express, Request, Response} from 'express';
const port = 3000

const app: Express = express();


app.get("/", (req: Request,res: Response) => {
    res.send("Test is working")
})


app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
})