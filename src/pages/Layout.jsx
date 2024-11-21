import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

import TransactionTable from './TransactionTable';
import DeploymentTable from './DeploymentTable';

// Define your navigation structure with icons for better clarity
const NAVIGATION = [
  {

    kind: 'header',
    title: 'Tables',
  },
  {
    segment: 'transactions',
    title: 'Transactions',
    icon: <DashboardIcon />,
  },
  {
    segment: 'deployment',
    title: 'Deployment',
    icon: <ShoppingCartIcon />,
  },
];


// Define a refined theme for the dashboard
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/transactions'); // Start at the 'transactions' segment
  const demoWindow = window !== undefined ? window() : undefined;

  const renderContent = () => {
    switch (router.pathname) {
      case '/transactions':
        return <TransactionTable />;
      case '/deployment':
        return <DeploymentTable />;
      default:
        return <Typography>Select a page</Typography>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'bothnode app',
      }}
      router={router}
      theme={theme}
      window={demoWindow}
    >
      
      <DashboardLayout>
        {/* Main Content Box with Improved Spacing and Centering */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',  // Optional for vertical centering
            py: 4,
            bgcolor: 'background.paper',
            //mb: 2,
            //mt: '32px',  // Offset for the fixed AppBar height (adjust according to your AppBar height)
            width: '100%',  // Ensure the Box takes full width of the parent container
            maxWidth: '100%',  // Prevents any content overflow
          }}
        >
        </Box>


        {/* Main content area with padding */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            textAlign: 'center',
            width: '100%',  // Ensure the Box takes full width of the parent container
            maxWidth: '100%',  // Prevents any content overflow
            p: 3,
          }}
        >
          <Container>{renderContent()}</Container>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;
