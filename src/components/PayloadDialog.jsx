import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar } from '@mui/material';
import { useState } from 'react';

const PayloadDialog = ({ open, onClose, payload }) => {
  const [copySuccess, setCopySuccess] = useState(false); // State to track copy success

  const handleCopy = () => {
    if (payload) {
      const payloadString = JSON.stringify(payload, null, 2);
      navigator.clipboard.writeText(payloadString) // Copy the payload string to the clipboard
        .then(() => {
          setCopySuccess(true); // Show success feedback
          setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopy} color="primary">
            Copy
          </Button>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for showing copy success */}
      {copySuccess && (
        <Snackbar
          open={copySuccess}
          autoHideDuration={2000}
          message="Copied to clipboard!"
        />
      )}
    </>
  );
};

export default PayloadDialog;
