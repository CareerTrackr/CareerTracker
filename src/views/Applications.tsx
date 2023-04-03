import React, { useEffect, useState } from "react";
import { Box, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';

export const Applications = () => {
  const [columns, setColumns] = useState <GridColDef[]>([]);
  const [rows, setRows] = useState <Object[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("http://localhost:5174/")
      .then(data => data.json())
      .then(data => {
        //set renderCells as necessary
        for(let i = 0; i < data.columns.length; i++){
          if(data.columns[i].renderCellLink) data.columns[i].renderCell = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => <Link target="_blank" rel="noopener" href={`https://${params.row.link}`}>{params.row.link}</Link>
        }
        setColumns(data.columns);
        //assign each piece of data an id to keep track of the number of applications dynamically
        for(let i = 1; i <= data.rows.length; i++){
          data.rows[i - 1].id = i;
        }
        setRows(data.rows);
      })
  }

  return (
    <Box sx={{ height: '60vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}