import express from 'express';
// import * as cors from 'cors';
import { Request, Response } from "express";

const PORT = 5174;
const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
})

app.get("/", (req: Request, res: Response) => {
  console.log('in get request')
  res.send('Hello from server')
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))