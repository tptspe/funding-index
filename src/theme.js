import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#bf0000',
        },
        secondary: {
            main: '#000',
        },
        text: {
            primary: '#1A1A1A'
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        black: {
            main: '#000'
        }
    },
    typography: {
        fontFamily: [
          'Open Sans',          
          'sans-serif',
        ].join(','),
        h3: {
            fontWeight: 600
        },
        h6: {
            fontWeight: 600
        }
    },
    overrides: {
        MuiButton: {
            root: {
                fontWeight: 400,
                textTransform: 'capitalize',
                minWidth: '120px'
            },
        },
    },
});

export default theme;