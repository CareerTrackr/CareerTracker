import React, { useEffect, useState } from "react";
import { Box, Link, Fab, Modal, FormGroup, Button, InputLabel, TextField, Select, MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';

export const Applications = () => {
  const [columns, setColumns] = useState <GridColDef[]>([]);
  const [rows, setRows] = useState <Object[]>([]);
  const [showRowModal, setShowRowModal] = useState <boolean>(false);
  const [status, setStatus] = useState <string>('Applied');

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

  function addRow() {
    console.log('hello')
  }

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Modal
        open={showRowModal}
        onClose={() => setShowRowModal(false)}
        sx={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <Box sx={{position: 'center'}}>
          <form>
            <FormGroup sx={{ padding: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main' }}>
              <TextField 
                sx={{ paddingBottom: 2 }} 
                variant="standard" 
                label="Date"
                defaultValue={`${new Date().getMonth() + 1}\/${new Date().getDate()}`}
              />
              <InputLabel id="status" htmlFor="uncontrolled-native">Status</InputLabel>
              <Select
                labelId="status"
                label="Age"
                id="status"
                defaultValue='Applied'
                value={status}
                onChange={(event) => {
                  event.preventDefault();
                  setStatus(event.target.value);
                }}
              >
                <MenuItem value='Applied'>Applied</MenuItem>
                <MenuItem value='Followed Up'>Followed Up</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
                <MenuItem value='Lost'>Lost</MenuItem>
                <MenuItem value='Offer'>Offer</MenuItem>
                <MenuItem value='Phone Screen'>Phone Screen</MenuItem>
                <MenuItem value='Technical Interview/Take Home'>Technical Interview/Take Home</MenuItem>
                <MenuItem value='Onsite'>Onsite</MenuItem>
                <MenuItem value='Declined'>Declined</MenuItem>
              </Select>
              <TextField 
                sx={{ paddingBottom: 2 }} 
                variant="standard" 
                label="Company Title"
              />
              <TextField 
                sx={{ paddingBottom: 2 }} 
                variant="standard" 
                label="Title Role"
              />
              <TextField 
                sx={{ paddingBottom: 2 }} 
                variant="standard" 
                label="Link"
              />
              <Button variant="contained" startIcon={<SendIcon/>}>
                Submit
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Modal>
      <Fab aria-label='add' color='primary' onClick={() => {setShowRowModal(true)}} sx={{position: 'absolute', bottom: -16, right: 16}}>
        <AddIcon/>
      </Fab>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}