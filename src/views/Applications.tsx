import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Link from '@mui/material/Link';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';

export const Applications = () => {
  const [columns, setColumns] = useState <GridColDef[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("http://localhost:5174/")
      .then(data => data.json())
      .then(data => {
        for(let i = 0; i < data.columns.length; i++){
          if(data.columns[i].renderCellLink) data.columns[i].renderCell = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => <Link target="_blank" rel="noopener" href={`https://${params.row.link}`}>{params.row.link}</Link>
        }
        setColumns(data.columns);
      })
  }

  const rows = [
    { id: 1, date: '3/1', status: 'Applied', company: 'Google', role: 'SE 2', link: 'www.google.com' },
    { id: 2, date: '3/5', status: 'Applied', company: 'Amazon', role: 'SE 1', link: 'www.amazon.com' },
    { id: 3, date: '3/20', status: 'Applied', company: 'Netflix', role: 'Senior SE', link: 'www.netflix.com' },
  ]

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}