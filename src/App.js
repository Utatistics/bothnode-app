import React from 'react';
import './App.css';
import SidebarLayout from './Layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SidebarLayout /> {/* Render SidebarLayout inside App */}
      </header>
    </div>
  );
}

export default App;
