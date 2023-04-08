import * as fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const patchDatabase = async function patchDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // read from database
    const data = await fs.promises.readFile('applicationData.json', 'utf8');
    const newData = JSON.parse(data);
    // set rows to new data
    newData.rows = req.body.rowData;
    // write to database
    await fs.promises.writeFile(
      'applicationData.json',
      JSON.stringify(newData)
    );
    return next();
  } catch (err) {
    return res
      .status(418)
      .send(
        'I do not have a teapot, so I cannot and will not brew coffee with it.'
      );
  }
};

const postDatabase = async function postDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // read from database
    const data = await fs.promises.readFile('applicationData.json', 'utf8');
    const newData = JSON.parse(data);
    // add new data in
    newData.rows.push(req.body.newRow);
    // write to database
    await fs.promises.writeFile(
      'applicationData.json',
      JSON.stringify(newData)
    );
    return next();
  } catch (err) {
    return res
      .status(418)
      .send(
        'I do not have a teapot, so I cannot and will not brew coffee with it.'
      );
  }
};

const getDatabase = async function getDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // read from database
    const data = await fs.promises.readFile('applicationData.json', 'utf8');
    res.locals.data = data;
    return next();
  } catch (noFile) {
    // if file doesn't exist, write to file a template
    await fs.promises.writeFile(
      'applicationData.json',
      JSON.stringify({
        columns: [
          { field: 'id', headerName: 'ID', width: 50 },
          {
            field: 'date',
            headerName: 'Date',
            width: 90,
            editable: true,
          },
          {
            field: 'status',
            headerName: 'Status',
            width: 110,
            editable: true,
          },
          {
            field: 'company',
            headerName: 'Company',
            width: 110,
            editable: true,
          },
          {
            field: 'role',
            headerName: 'Role',
            width: 110,
            editable: true,
          },
          {
            field: 'link',
            headerName: 'Link',
            width: 200,
            editable: true,
            renderCellLink: true,
          },
        ],
        rows: [],
      })
    );
    // read data from database after writing to it
    const data = await fs.promises.readFile('applicationData.json');
    res.locals.data = data;
    return next();
  }
};

export default { patchDatabase, postDatabase, getDatabase };
