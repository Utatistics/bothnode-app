import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';

import FolderIcon from '@mui/icons-material/Folder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

import TransactionTable from './TransactionTable';
import DeploymentTable from './DeploymentTable';

// Define your navigation structure with icons for better clarity
const NAVIGATION = [
  {
    kind: 'header',
    title: '',
    sx: {     // Add margin to the header section inside the sidebar
      mt: 10, // Adds margin-top inside the navigation bar above the header
      mb: 10, // Optional: margin-bottom to add space below the header
    },
  },
  {
    segment: 'tables',
    title: 'Tables',
    icon: <FolderIcon />,
    children: [
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
    ]
  },
  {
    segument: 'analytics',
    title: 'Analytics',
    icon: <QueryStatsIcon />,
    children: []
  },
  {
    segument: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    children: []
  }
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

const SidebarSpacer = () => {
  return (
    <Box
      sx={{
        height: '50px', // Adjust the height based on how much space you want
        bgcolor: 'background.paper', // Optional: match the background to the sidebar's background
      }}
    />
  );
};

function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
    >
      {mini ? '© MUI' : `© ${new Date().getFullYear()} bothnode-suite proeuction`}
    </Typography>
  );
}

function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('tables/transactions'); // Start at the 'transactions' segment
  const demoWindow = window !== undefined ? window() : undefined;

  const renderContent = () => {
    switch (router.pathname) {
      case '/tables/transactions':
        return <TransactionTable />;
      case '/tables/deployment':
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
      <DashboardLayout
        slots={{
          sidebarFooter: SidebarFooter,
        }}
      >
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
