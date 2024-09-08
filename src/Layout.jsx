import React, { useState } from 'react';
import { Typography, Drawer, List, ListItem, ListItemText, Box, Container, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TransactionTable from './TransactionTable'; // Import your TransactionTable component

function SidebarLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Transactions');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (page) => {
    setSelectedPage(page);
    setDrawerOpen(false);
  };

  const renderPage = () => {
    switch (selectedPage) {
      case 'Transactions':
        return <TransactionTable />;
      // Add more cases here for other pages/components
      default:
        return <Typography>Select a page</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'white'}}>
      {/* AppBar with MenuIcon */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            bothnode app
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItem
            button // Ensures ListItem acts as a button
            onClick={() => handleMenuClick('Transactions')}
            sx={{ cursor: 'pointer' }} // Ensures the item looks clickable
          >
            <ListItemText primary="Transactions" />
          </ListItem>
          {/* Add more menu items here */}
        </List>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Container>
          {renderPage()}
        </Container>
      </Box>
    </Box>
  );
}

export default SidebarLayout;
