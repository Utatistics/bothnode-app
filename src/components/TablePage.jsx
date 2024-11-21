// components/TablePage.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Alert } from '@mui/material';
import DataTable from './DataTable';
import PayloadDialog from './PayloadDialog';

const TablePage = ({ title, apiUrl, columns, dialogField }) => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayload, setSelectedPayload] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response issue');
        }
        return response.json();
      })
      .then(data => setRows(data))
      .catch(error => setError(error.message));
  }, [apiUrl]);

  const handleRowClick = (params) => {
    const fieldName = params.colDef.field;
    if (dialogField.includes(fieldName)) {
      setSelectedPayload(params.row[fieldName]);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayload(null);
  };

  const updatedColumns = columns.map(col =>
    dialogField.includes(col.field) ? 
      { ...col, renderCell: (params) => (
        <Button onClick={() => handleRowClick(params)}>View</Button>
      )} 
      : col
  );

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, color: 'black' }}>
        {title}
      </Typography>
      <DataTable rows={rows} columns={updatedColumns} />
      <PayloadDialog open={openDialog} onClose={handleCloseDialog} payload={selectedPayload} />
    </Container>
  );
};

export default TablePage;
