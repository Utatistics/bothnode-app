// components/TablePage.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Alert } from '@mui/material';
import DataTable from './DataTable';
import PayloadDialog from './PayloadDialog';

const TablePage = ({ title, apiUrl, columns, dialogField}) => {

  /**
   * Defines the re-usable structure of table page that renders with the given props 
   * @param {string} titile - the header of table
   * @param {string} apiUrl - url for FastAPI endpoint of bothnode
   * @param {Array<Object>} columns - defined columns to insert into the table
   * @param {Array<string>} dialogField - The array of field names for triggering the dialog.
   */

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
  }, [apiUrl]); // dependency: useEffect runs when `apiUrl` changes

  const handleRowClick = (params) => {
    const fieldName = params.colDef.field;
    if (dialogField.includes(fieldName)) {
      setSelectedPayload(params.row[fieldName]);  // Dynamically access the dialogField
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
