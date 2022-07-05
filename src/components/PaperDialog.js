import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function PaperDialog(props) {
  const [records, setRecords] = useState('');

  async function fetchRecords() {
    const res = (await axios.get('http://localhost:3001/records')).data;
    setRecords(JSON.stringify(res));
  }

  useEffect(() => {
    if (props.dialogOpen) {
      fetchRecords();
    }
  }, [props.dialogOpen]);

  return (
    <div>
      <Dialog
        open={props.dialogOpen}
        onClose={props.onClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Calculated Records</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {records}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
