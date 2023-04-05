import React from 'react';
import { Box, Button } from '@mui/material';
import Link from '@mui/material/Link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const Applications = () => {
  function testFunc() {
    fetch('http://localhost:5174/');
  }

  const columns: GridColDef[] = [
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
      renderCell: (params) => (
        <Link href={`https://${params.row.link}`}>{params.row.link}</Link>
      ),
      width: 200,
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      date: '3/1',
      status: 'Applied',
      company: 'Google',
      role: 'SE 2',
      link: 'www.google.com',
    },
    {
      id: 2,
      date: '3/5',
      status: 'Applied',
      company: 'Amazon',
      role: 'SE 1',
      link: 'www.amazon.com',
    },
    {
      id: 3,
      date: '3/20',
      status: 'Applied',
      company: 'Netflix',
      role: 'Senior SE',
      link: 'www.netflix.com',
    },
  ];

  return (
    <div className="applications">
      <Box sx={{ height: '100vh', width: '100%' }}>
        <Button onClick={testFunc}>Push This</Button>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};
