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
    res.send(data);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))