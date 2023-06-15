import * as fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const getDatabase = async function getDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await fs.promises.readFile('notesData.json', 'utf8');
    res.locals.data = data;
    return next();
  } catch (noFile) {
    await fs.promises.writeFile(
      'notesData.json',
      JSON.stringify({
        github: '',
        linkedin: '',
        email: '',
        portfolio: '',
        other: '',
        notes: '',
        coverLetter: '',
      })
    );
    const data = await fs.promises.readFile('notesData.json');
    res.locals.data = data;
    return next();
  }
};

const patchDatabase = async function patchDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await fs.promises.writeFile(
      'notesData.json',
      JSON.stringify(req.body.notes)
    );
    return next();
  } catch (err) {
    return res
      .status(418)
      .send('I am not a teapot, so I cannot and will not brew coffee with it.');
  }
};

export default { getDatabase, patchDatabase };
