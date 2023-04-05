import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Notes = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNote = () => {
    // implement add note functionality
    handleClose();
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'date',
      headerName: 'Date',
      width: 90,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      editable: true,
    },
    {
      field: 'body',
      headerName: 'Notes',
      width: 500,
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      date: '3/1',
      title: 'Frontend interview preparation',
      body: 'Today I will learn Angular.',
    },
    {
      id: 2,
      date: '3/5',
      title: 'My React project',
      body: 'I love React.',
    },
  ];

  useEffect(() => {
    setNotes([...notes]);
  }, [notes]);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add a new note
      </Button>

      <Box sx={{ height: '100vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="modal-text">
          <Modal.Header closeButton>
            <Modal.Title>
              <input
                placeholder="New Note"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              placeholder="Write your notes"
              onChange={(e) => setBody(e.target.value)}
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Discard
            </Button>
            <Button variant="primary" onClick={addNote}>
              Save
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Notes;
