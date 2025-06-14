import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ZakatCalculatorComponent from './components/ZakatCalculator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Islamic green
    },
    secondary: {
      main: '#1B5E20',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ZakatCalculatorComponent />
    </ThemeProvider>
  );
};

export default App; 