import express from 'express';
import * as fs from 'fs';
import { Request, Response } from "express";

const PORT = 5174;
const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
})

app.get("/", async (req: Request, res: Response) => {
  try {
    const data = await fs.promises.readFile('applicationData.json', 'utf8');
    res.send(data);
  }
  catch(err){
    await fs.promises.writeFile('applicationData.json', JSON.stringify({}));
    const data = await fs.promises.readFile('applicationData.json')
    res.send(data);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))