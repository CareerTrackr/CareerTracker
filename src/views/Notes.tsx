/* eslint-disable react/jsx-no-bind */
// above rule is based on this: https://stackoverflow.com/questions/36677733/why-shouldnt-jsx-props-use-arrow-functions-or-bind
// without disabling, would bring up an eslint error for onChange(someFunc), stating: "JSX props should not use functions"
// apparently this issue has been fixed, so disabling the rule
import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  TextField,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import { jsPDF as JSPDF } from 'jspdf';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { NotesData } from '../../types';

export default function Notes(): JSX.Element {
  // github, linkedin, portfolio, other
  const [notesData, setNotesData] = useState<NotesData>({
    github: '',
    linkedin: '',
    email: '',
    portfolio: '',
    other: '',
    notes: '',
    coverLetter: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  function fetchData() {
    fetch('http://localhost:5174/notes')
      .then((data) => data.json())
      .then((data) => {
        setNotesData(data);
        setLoading(false);
      });
  }

  function onLinksChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNotesData({ ...notesData, [event.target.name]: event.target.value });

    fetch('http://localhost:5174/notes', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        notes: notesData,
      }),
    });
  }

  // disabling no-any due to typescript not being able to handle Iconbutton onClick input
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function copyHandler(event: any, name: string) {
    navigator.clipboard.writeText(notesData[name as keyof NotesData]);
  }

  function handleDownloadCoverLetter(): void {
    const doc = new JSPDF({
      format: 'letter',
    });
    doc.setFont('arial');
    doc.setFontSize(14);
    doc.text(notesData.coverLetter, 20, 30, {
      maxWidth: 175,
    });
    doc.save('CoverLetter.pdf');
  }

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div>LOADING!</div>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '93vh',
        width: '100%',
      }}
    >
      <Box sx={{ width: '50%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: 1,
            borderRadius: 1,
            margin: 1,
            padding: 1,
            borderColor: '#424242',
          }}
        >
          <Box display="flex">
            <Chip
              label="GitHub"
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                marginTop: '20px',
                marginBottom: '20px',
                height: '40px',
                minWidth: '120px',
                fontSize: '20px',
              }}
            />
            <TextField
              name="github"
              size="small"
              defaultValue={notesData.github}
              fullWidth
              sx={{
                marginTop: '20px',
                marginBottom: '20px',
              }}
              onChange={onLinksChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="github"
              color="primary"
              onClick={(e) => copyHandler(e, 'github')}
              sx={{
                marginTop: '20px',
                borderRadius: 0,
                border: 1,
                borderColor: '#424242',
                height: '40px',
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box display="flex">
            <Chip
              label="Linkedin"
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                height: '40px',
                minWidth: '120px',
                fontSize: '20px',
              }}
            />
            <TextField
              name="linkedin"
              size="small"
              defaultValue={notesData.linkedin}
              fullWidth
              sx={{
                marginBottom: '20px',
              }}
              onChange={onLinksChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="linkedin"
              color="primary"
              onClick={(e) => copyHandler(e, 'linkedin')}
              sx={{
                borderRadius: 0,
                border: 1,
                borderColor: '#424242',
                height: '40px',
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box display="flex">
            <Chip
              label="Email"
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                height: '40px',
                minWidth: '120px',
                fontSize: '20px',
              }}
            />
            <TextField
              name="email"
              size="small"
              defaultValue={notesData.email}
              fullWidth
              sx={{
                marginBottom: '20px',
              }}
              onChange={onLinksChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="email"
              color="primary"
              onClick={(e) => copyHandler(e, 'email')}
              sx={{
                borderRadius: 0,
                border: 1,
                borderColor: '#424242',
                height: '40px',
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box display="flex">
            <Chip
              label="Portfolio"
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                height: '40px',
                minWidth: '120px',
                fontSize: '20px',
              }}
            />
            <TextField
              name="portfolio"
              size="small"
              defaultValue={notesData.portfolio}
              fullWidth
              sx={{
                marginBottom: '20px',
              }}
              onChange={onLinksChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="portfolio"
              color="primary"
              onClick={(e) => copyHandler(e, 'portfolio')}
              sx={{
                borderRadius: 0,
                border: 1,
                borderColor: '#424242',
                height: '40px',
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box display="flex">
            <Chip
              label="Other"
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                height: '40px',
                minWidth: '120px',
                fontSize: '20px',
              }}
            />
            <TextField
              name="other"
              size="small"
              defaultValue={notesData.other}
              fullWidth
              sx={{
                marginBottom: '20px',
              }}
              onChange={onLinksChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="other"
              color="primary"
              onClick={(e) => copyHandler(e, 'other')}
              sx={{
                borderRadius: 0,
                border: 1,
                borderColor: '#424242',
                height: '40px',
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            margin: 1,
            padding: 1,
            borderColor: '#424242',
          }}
        >
          <TextField
            name="notes"
            fullWidth
            multiline
            minRows={8.3}
            placeholder="Write some notes..."
            onChange={onLinksChangeHandler}
          />
        </Box>
      </Box>

      <Box sx={{ width: '50%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: 1,
            borderRadius: 1,
            margin: 1,
            padding: 1,
            borderColor: '#424242',
          }}
        >
          <Typography variant="h5">Cover Letter</Typography>
          <TextField
            name="coverLetter"
            fullWidth
            multiline
            minRows={20}
            placeholder="Cover letter here..."
            onChange={onLinksChangeHandler}
            sx={{ marginTop: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="contained"
              endIcon={<DownloadIcon />}
              onClick={handleDownloadCoverLetter}
              sx={{ marginTop: 1, width: '150px' }}
            >
              Download
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
