import React, { useState, useEffect } from 'react';

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Sending GET request...");
    fetch('http://127.0.0.1:8000/api/v1/transactions/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Transactions</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender Address</th>
            <th>Target Transaction</th>
            <th>Payload</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.sender_address}</td>
              <td>{transaction.target_transaction}</td>
              <td>{JSON.stringify(transaction.payload)}</td>
              <td>{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
