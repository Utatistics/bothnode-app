import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';


const DataTable = ({ rows, columns }) => (
  <Box sx={{ height: 600, width: '100%', overflow: 'hidden' }}>
    <div className="scrollable-container" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
        sx={{
          width: '100%',
          '& .MuiDataGrid-root': {
            minWidth: '100%', 
            boxSizing: 'border-box', 
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
);

export default DataTable;