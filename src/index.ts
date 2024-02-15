import express, { Request, Response } from 'express';
import { RequestHandler } from './handler/request_handler';

const app = express();
const port = 3000;

app.use(express.json()) 

app.all('*', (req: Request, res: Response,) => {
    new RequestHandler(req, res).handleRequest();
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
