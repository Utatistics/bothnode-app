import React, { useState, useEffect } from 'react';
import { Container, Typography, Alert, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './styles.css'; // Assuming you have this CSS file for custom styles

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Sending GET request...");
    fetch('http://127.0.0.1:8000/api/v1/transactions/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Issues with the network response');
        }
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data);
        setTransactions(data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
        setError(error.message);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'sender_address', headerName: 'Sender Address', width: 200 },
    { field: 'target_transaction', headerName: 'Target Transaction', width: 200 },
    { field: 'payload', headerName: 'Payload', width: 300, renderCell: (params) => <div>{JSON.stringify(params.value)}</div> },
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  ];

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, color: 'black' }}>
        Transactions
      </Typography>

      <Box sx={{ height: 600, width: '100%', overflow: 'hidden' }}>
        <div className="scrollable-container" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
          <DataGrid
            rows={transactions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            checkboxSelection
            sx={{
              width: '100%',
              '& .MuiDataGrid-root': {
                minWidth: '100%', // Ensure it takes full width
                boxSizing: 'border-box', // Ensure box sizing includes padding and border
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#001f3f',
                color: 'black',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-row': {
                backgroundColor: 'white',
                color: '#001f3f',
                '&:hover': {
                  backgroundColor: '#f1f1f1',
                },
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #001f3f',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #001f3f',
              },
            }}
          />
        </div>
      </Box>
    </Container>
  );
}

export default TransactionTable;
