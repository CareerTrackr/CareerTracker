import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import itemcontroller from './controllers/itemcontroller.js';
const PORT = 5174;
const app = express();

app.use(cors());
app.use(express.json());

app.patch(
  '/',
  itemcontroller.patchDatabase,
  async (req: Request, res: Response) => {
    return res.status(200).send('Patch successful.');
  }
);

app.post(
  '/',
  itemcontroller.postDatabase,
  async (req: Request, res: Response) => {
    return res.status(200).send('Post successful.');
  }
);

app.get(
  '/',
  itemcontroller.getDatabase,
  async (req: Request, res: Response) => {
    return res.status(200).send(res.locals.data);
  }
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
