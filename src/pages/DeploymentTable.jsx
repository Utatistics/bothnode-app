import React from 'react';
import TablePage from '../components/TablePage';

const deploymentColumns = [
  { field: 'address', headerName: 'Address', width: 300 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  { field: 'contractName', headerName: 'Contract Name', width: 200 },
  { field: 'network', headerName: 'Network', width: 150 },
  { field: 'sourcePath', headerName: 'Source Path', width: 400 },
  { field: 'bytecode', headerName: 'Bytecode', width: 200 },
  { field: 'abi', headerName: 'ABI', width: 300, sortable: false },
];

const DeploymentTable = () => (
  <TablePage
    title="Deployments"
    apiUrl="http://127.0.0.1:8000/api/v1/contracts/"
    columns={deploymentColumns}
    dialogField={['bytecode','abi']}
  />
);

export default DeploymentTable;
