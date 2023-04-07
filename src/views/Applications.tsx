import React, { useEffect, useState } from 'react';
import {
  Box,
  Link,
  Fab,
  Modal,
  FormGroup,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { RowData, IdCache } from '../../types';

export const Applications = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<RowData[]>([]);
  const [showRowModal, setShowRowModal] = useState<boolean>(false);
  const [newRowData, setNewRowData] = useState<RowData>({});
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch('http://localhost:5174/')
      .then((data) => data.json())
      .then((data) => {
        //set renderCells as necessary
        for (let i = 0; i < data.columns.length; i++) {
          if (data.columns[i].renderCellLink)
            data.columns[i].renderCell = (
              params: GridRenderCellParams<
                any,
                any,
                any,
                GridTreeNodeWithRender
              >
            ) => (
              <Link
                target="_blank"
                rel="noopener"
                href={`https://${params.row.link}`}
              >
                {params.row.link}
              </Link>
            );
        }
        setColumns(data.columns);
        //assign each piece of data an id to keep track of the number of applications dynamically
        for (let i = 1; i <= data.rows.length; i++) {
          data.rows[i - 1].id = i;
        }
        setRows(data.rows);
      });
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    //dynamically update newRowData upon changes in modal
    setNewRowData({ ...newRowData, [event.target.name]: event.target.value });
  }

  function handleSubmit() {
    //close modal
    setShowRowModal(false);
    //send row data to update database
    if (!newRowData.date)
      newRowData.date = `${new Date().getMonth() + 1}\/${new Date().getDate()}`;
    if (!newRowData.status) newRowData.status = 'Applied';
    fetch('http://localhost:5174/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        newRow: newRowData,
      }),
    })
      .then(() => {
        //clear data from state
        setNewRowData({});
        fetchData();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function handleSelections(rowSelectionModel: GridRowSelectionModel) {
    //dynamically update ids selected
    setSelectedIds(rowSelectionModel);
  }

  function handleDeleteSelected() {
    //create object to hold ids to be deleted
    const deleteIds: IdCache = {};
    selectedIds.forEach((id) => {
      deleteIds[id] = true;
    });
    //iterate over data, add to updatedDataset if not to be deleted
    const updatedDataset = [];
    for (let i = 0; i < rows.length; i++) {
      if (!deleteIds[rows[i].id]) updatedDataset.push(rows[i]);
      console.log(updatedDataset);
    }
    //clear selected ids
    setSelectedIds([]);
    //update database
    fetch('http://localhost:5174/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        rowData: updatedDataset,
      }),
    })
      .then(() => {
        //refetch data
        fetchData();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Modal
        open={showRowModal}
        onClose={() => setShowRowModal(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ position: 'center' }}>
          <iframe
            name="hiddenFrame"
            id="hiddenFrame"
            width="0px"
            height="0px"
          ></iframe>
          <form action="/submitModal" target="hiddenFrame">
            <FormGroup
              sx={{
                padding: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.main',
                backgroundColor: grey[900],
              }}
            >
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <TextField
                  name="date"
                  variant="standard"
                  label="Date"
                  defaultValue={`${
                    new Date().getMonth() + 1
                  }\/${new Date().getDate()}`}
                  onChange={onChangeHandler}
                  sx={{ paddingBottom: 2, paddingRight: 1, width: 70 }}
                />
                <TextField
                  name="company"
                  variant="standard"
                  label="Company Title"
                  placeholder="Company Title"
                  onChange={onChangeHandler}
                  sx={{ paddingBottom: 2, minWidth: '330px' }}
                />
              </Box>
              <TextField
                name="status"
                label="Status"
                select={true}
                defaultValue="Applied"
                onChange={onChangeHandler}
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Followed Up">Followed Up</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Lost">Lost</MenuItem>
                <MenuItem value="Offer">Offer</MenuItem>
                <MenuItem value="Phone Screen">Phone Screen</MenuItem>
                <MenuItem value="Technical Interview/Take Home">
                  Technical Interview/Take Home
                </MenuItem>
                <MenuItem value="Onsite">Onsite</MenuItem>
                <MenuItem value="Declined">Declined</MenuItem>
              </TextField>
              <TextField
                name="role"
                variant="standard"
                label="Role Title"
                onChange={onChangeHandler}
                sx={{ paddingBottom: 2 }}
              />
              <TextField
                name="link"
                variant="standard"
                label="Link"
                onChange={onChangeHandler}
                sx={{ paddingBottom: 2 }}
              />
              <TextField
                name="notes"
                multiline={true}
                label="Notes"
                variant="outlined"
                placeholder="Notes here..."
                onChange={onChangeHandler}
                maxRows={10}
                sx={{ paddingBottom: 2, minWidth: '400px' }}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                startIcon={<SendIcon />}
              >
                Submit
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Modal>
      {selectedIds.length ? (
        <Fab
          aria-label="delete"
          color="error"
          onClick={handleDeleteSelected}
          sx={{ position: 'absolute', bottom: -16, right: 16 }}
        >
          <DeleteIcon />
        </Fab>
      ) : (
        <Fab
          aria-label="add"
          color="primary"
          onClick={() => {
            setShowRowModal(true);
          }}
          sx={{ position: 'absolute', bottom: -16, right: 16 }}
        >
          <AddIcon />
        </Fab>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelections}
        rowSelectionModel={selectedIds}
      />
    </Box>
  );
};
