/* eslint-disable react/jsx-no-bind */
// above rule is based on this: https://stackoverflow.com/questions/36677733/why-shouldnt-jsx-props-use-arrow-functions-or-bind
// without disabling, would bring up an eslint error for onChange(someFunc), stating: "JSX props should not use functions"
// apparently this issue has been fixed, so disabling the rule
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { NotesProp } from '../../types';

export default function Notes(): JSX.Element {
  // github, linkedin, portfolio, other
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      
    </Box>
  );
}
