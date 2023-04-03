import React, { useEffect, useState } from "react";
import { Box, Link, Fab, Modal, FormGroup, Button, InputLabel, TextField, Select, MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';
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
        sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
      >
        <Box sx={{position: 'center'}}>
          <form>
            <FormGroup sx={{ padding: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main', backgroundColor: grey[900] }}>
              <Box sx={{ display: 'flex', flexGrow: 1 }}>  
                <TextField 
                  sx={{ paddingBottom: 2, paddingRight: 1, width: 70 }} 
                  variant="standard" 
                  label="Date"
                  defaultValue={`${new Date().getMonth() + 1}\/${new Date().getDate()}`}
                />
                <TextField 
                  sx={{ paddingBottom: 2, minWidth: '330px'}}
                  variant="standard" 
                  label="Company Title"
                  placeholder="Company Title"
                />
              </Box>
              <TextField
                label="Status"
                select={true}
                defaultValue='Applied'
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
              </TextField>
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
              <TextField
                sx={{ paddingBottom: 2, minWidth: '400px' }}
                multiline={true}
                label="Notes"
                variant="outlined"
                placeholder="Notes here..."
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