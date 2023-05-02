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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { UrlData } from '../../types';

export default function Notes(): JSX.Element {
  // github, linkedin, portfolio, other
  const [urlData, setUrlData] = useState<UrlData>({});

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUrlData({ ...urlData, [event.target.name]: event.target.value });
  }

  // disabling no-any due to typescript not being able to handle Iconbutton onClick input
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function copyHandler(event: any) {
    navigator.clipboard.writeText(urlData[event.target.name]);
  }

  function handleNotesChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(JSON.stringify(event.target.value));
  }

  function handleCoverLetterChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(JSON.stringify(event.target.value));
  }

  return (
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
              fullWidth
              sx={{
                marginTop: '20px',
                marginBottom: '20px',
              }}
              onChange={onChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="github"
              color="primary"
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
              fullWidth
              sx={{
                marginBottom: '20px',
              }}
              onChange={onChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="linkedin"
              color="primary"
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
              fullWidth
              sx={{
                marginBottom: '20px',
              }}
              onChange={onChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="email"
              color="primary"
              onClick={copyHandler}
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
              fullWidth
              sx={{
                marginBottom: '20px',
              }}
              onChange={onChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="portfolio"
              color="primary"
              onClick={copyHandler}
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
              fullWidth
              sx={{
                marginBottom: '20px',
              }}
              onChange={onChangeHandler}
              InputProps={{ sx: { borderRadius: 0 } }}
            />
            <IconButton
              name="other"
              color="primary"
              onClick={copyHandler}
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
            onChange={handleNotesChange}
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
            onChange={handleCoverLetterChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="contained"
              endIcon={<DownloadIcon />}
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
