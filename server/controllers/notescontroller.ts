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
        github: 'github.com',
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

export default { getDatabase };
