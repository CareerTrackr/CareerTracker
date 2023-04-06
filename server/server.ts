import express from 'express';
import { Request, Response } from "express";
import cors from 'cors';
const itemController = require('./controllers/itemController');
const PORT = 5174;
const app = express();

app.use(cors());
app.use(express.json());

app.patch("/", itemController.patchDatabase, async (req: Request, res: Response) => {
  return res.status(200).send('Patch successful.')
})

app.post("/", itemController.postDatabase, async (req: Request, res: Response) => {
  return res.status(200).send('Post successful.');
})

app.get("/", itemController.getDatabase, async (req: Request, res: Response) => {
  return res.status(200).send(res.locals.data);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))