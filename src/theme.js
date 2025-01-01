import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto', // Thay đổi thành font Roboto
      'sans-serif',
    ].join(','),
  },
});

export default theme;