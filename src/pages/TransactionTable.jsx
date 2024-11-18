import React from 'react';
import TablePage from '../components/TablePage';

const transactionColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'sender_address', headerName: 'Sender Address', width: 200 },
  { field: 'target_transaction', headerName: 'Target Transaction', width: 200 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  { field: 'payload', headerName: 'Payload', width: 200 },
];

const TransactionTable = () => (
  <TablePage
    title="Transactions"
    apiUrl="http://127.0.0.1:8000/api/v1/transactions/"
    columns={transactionColumns}
    dialogField={'payload'}
  />
);

export default TransactionTable;
