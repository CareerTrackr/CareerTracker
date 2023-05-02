/* eslint-disable react/jsx-no-bind */
// above rule is based on this: https://stackoverflow.com/questions/36677733/why-shouldnt-jsx-props-use-arrow-functions-or-bind
// without disabling, would bring up an eslint error for onChange(someFunc), stating: "JSX props should not use functions"
// apparently this issue has been fixed, so disabling the rule
import React, { useEffect, useState } from 'react';
import { Box, Chip, TextField, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { UrlData } from '../../types';

export default function Notes(): JSX.Element {
  // github, linkedin, portfolio, other
  const [urlData, setUrlData] = useState<UrlData>({});

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUrlData({ ...urlData, [event.target.name]: event.target.value });
  }

  // disabling any due to typescript not being able to handle Iconbutton onClick input
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function copyHandler(event: any) {
    navigator.clipboard.writeText(urlData[event.target.name]);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '93vh',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          border: 1,
          borderRadius: 1,
          margin: 1,
          padding: 1,
          width: '50%',
          borderColor: 'grey.500',
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
    </Box>
  );
}
