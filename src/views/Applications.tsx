/* eslint-disable react/jsx-no-bind */
// above rule is based on this: https://stackoverflow.com/questions/36677733/why-shouldnt-jsx-props-use-arrow-functions-or-bind
// without disabling, would bring up an eslint error for onChange(someFunc), stating: "JSX props should not use functions"
// apparently this issue has been fixed, so disabling the rule
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
  R,
} from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { RowData, IdCache } from '../../types';

export default function Applications(): JSX.Element {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<RowData[]>([]);
  const [showRowModal, setShowRowModal] = useState<boolean>(false);
  const [newRowData, setNewRowData] = useState<RowData>({});
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);

  function fetchData() {
    fetch('http://localhost:5174/')
      .then((data) => data.json())
      .then((data) => {
        const newData = data;
        // set renderCells as necessary
        for (let i = 0; i < newData.columns.length; i += 1) {
          if (newData.columns[i].renderCellLink)
            newData.columns[i].renderCell = (
              params: GridRenderCellParams<
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                any,
                unknown,
                unknown,
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
          if (newData.columns[i].field === 'status') {
            newData.columns[i].renderCell = (
              params: GridRenderCellParams<
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                any,
                unknown,
                unknown,
                GridTreeNodeWithRender
              >
            ) => (
              <TextField select defaultValue={params.row.status}>
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
            );
          }
        }
        setColumns(newData.columns);
        // assign each piece of data an id to keep track of the number of applications dynamically
        for (let i = 1; i <= newData.rows.length; i += 1) {
          newData.rows[i - 1].id = i;
        }
        setRows(data.rows);
      });
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    // dynamically update newRowData upon changes in modal
    setNewRowData({ ...newRowData, [event.target.name]: event.target.value });
  }

  function handleSubmit() {
    // close modal
    setShowRowModal(false);
    // send row data to update database
    if (!newRowData.date)
      newRowData.date = `${new Date().getMonth() + 1}/${new Date().getDate()}`;
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
        // clear data from state
        setNewRowData({});
        fetchData();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function handleRowUpdate(newRow: R, oldRow: R) {
    console.log(newRow, oldRow);
  }

  function handleSelections(rowSelectionModel: GridRowSelectionModel) {
    // dynamically update ids selected
    setSelectedIds(rowSelectionModel);
  }

  function handleDeleteSelected() {
    // create object to hold ids to be deleted
    const deleteIds: IdCache = {};
    selectedIds.forEach((id) => {
      deleteIds[id] = true;
    });
    // iterate over data, add to updatedDataset if not to be deleted
    const updatedDataset = [];
    for (let i = 0; i < rows.length; i += 1) {
      if (!deleteIds[rows[i].id]) updatedDataset.push(rows[i]);
    }
    // clear selected ids
    setSelectedIds([]);
    // update database
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
        // refetch data
        fetchData();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ height: '91.5vh', width: '100%', margin: 1 }}>
      <Modal
        open={showRowModal}
        onClose={() => setShowRowModal(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ position: 'center' }}>
          <iframe
            title="Fetch Request"
            name="hiddenFrame"
            id="hiddenFrame"
            width="0px"
            height="0px"
          />
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
                  }/${new Date().getDate()}`}
                  onChange={onChangeHandler}
                  sx={{ paddingBottom: 2, paddingRight: 1, width: 70 }}
                />
                <TextField
                  name="company"
                  variant="standard"
                  label="Company Title"
                  defaultValue=""
                  placeholder="Company Title"
                  onChange={onChangeHandler}
                  sx={{ paddingBottom: 2, minWidth: '330px' }}
                />
              </Box>
              <TextField
                name="status"
                label="Status"
                select
                defaultValue="Applied"
                onChange={onChangeHandler}
                sx={{ paddingBottom: 2 }}
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
                defaultValue=""
                onChange={onChangeHandler}
                sx={{ paddingBottom: 2 }}
              />
              <TextField
                name="link"
                variant="standard"
                label="Link"
                defaultValue=""
                onChange={onChangeHandler}
                sx={{ paddingBottom: 2 }}
              />
              <TextField
                name="notes"
                multiline
                label="Notes"
                defaultValue=""
                variant="outlined"
                placeholder="Notes here..."
                onChange={onChangeHandler}
                maxRows={10}
                sx={{ paddingBottom: 2, minWidth: '400px' }}
              />
              <Button
                variant="contained"
                onClick={() => handleSubmit()}
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
          onClick={() => handleDeleteSelected()}
          sx={{ position: 'absolute', bottom: 74, right: 16 }}
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
          sx={{ position: 'absolute', bottom: 74, right: 16 }}
        >
          <AddIcon />
        </Fab>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={(newRow, oldRow) => handleRowUpdate(newRow, oldRow)}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(event) => handleSelections(event)}
        rowSelectionModel={selectedIds}
      />
    </Box>
  );
}
