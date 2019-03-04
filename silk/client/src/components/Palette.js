import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});



function Palette() {
  return (
    <MuiThemeProvider theme={theme}>
      <div> 
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign up
              </Button>
        </div>
        <div>
        <Button
                fullWidth
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
        </div>
    </MuiThemeProvider>
  );
}

export default Palette;
