import express from 'express';
import * as fs from 'fs';
import { Request, Response } from "express";
import cors from 'cors';
const PORT = 5174;
const app = express();

app.use(cors());
app.use(express.json());

app.patch("/", async (req: Request, res: Response) => {
  try{
    const data = await fs.promises.readFile('applicationData.json', 'utf8');
    const newData = JSON.parse(data);
    newData.rows = req.body.rowData;
    await fs.promises.writeFile('applicationData.json', JSON.stringify(newData));
    return res.status(200).send('Patch successful.')
  }
  catch(err){
    return res.status(418).send('I do not have a teapot, so I cannot and will not brew coffee with it.');
  }
})

app.post("/", async (req: Request, res: Response) => {
  try{
    const data = await fs.promises.readFile('applicationData.json', 'utf8');
    const newData = JSON.parse(data);
    newData.rows.push(req.body.newRow);
    await fs.promises.writeFile('applicationData.json', JSON.stringify(newData));
    return res.status(200).send('Post successful.');
  }
  catch(err){
    return res.status(418).send('I do not have a teapot, so I cannot and will not brew coffee with it.');
  }
})

app.get("/", async (req: Request, res: Response) => {
  try {
    const data = await fs.promises.readFile('applicationData.json', 'utf8');
    res.status(200).send(data);
  }
  catch(noFile){
    await fs.promises.writeFile('applicationData.json', JSON.stringify({
      columns: [
        { field: 'id', 
          headerName: 'ID', 
          width: 50
        },
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
      rows: [
        { date: '3/1', status: 'Applied', company: 'Google', role: 'SE 2', link: 'www.google.com' },
        { date: '3/5', status: 'Applied', company: 'Amazon', role: 'SE 1', link: 'www.amazon.com' },
        { date: '3/20', status: 'Applied', company: 'Netflix', role: 'Senior SE', link: 'www.netflix.com' },
      ]
    }));
    const data = await fs.promises.readFile('applicationData.json')
    res.status(201).send(data);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))