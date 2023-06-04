import express, { Request, Response } from 'express';
import cors from 'cors';
import itemcontroller from './controllers/itemcontroller.js';
import notescontroller from './controllers/notescontroller.js';

const PORT = 5174;
const app = express();

app.use(cors());
app.use(express.json());

// app.patch(
//   '/notes',
//   notescontroller.patchDatabase,
//   async (req: Request, res: Response) => {
//     return res.status(200).send('Patch successful');
//   }
// );

app.get(
  '/notes',
  notescontroller.getDatabase,
  async (req: Request, res: Response) => {
    return res.status(200).send(res.locals.data);
  }
);

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

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
app.listen(PORT);
