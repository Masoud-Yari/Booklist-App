import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ccc'
        }
    },
    overrides: {
        MuiTable: {
            root: {
                backgroundColor: '#1C2540'
            }
        },
        MuiTableRow: {
            root: {
                borderBottom: '.25em solid #242C4C'
            },
            head: {
                backgroundColor: '#242C4C',
                fontWeight: 'bolder'
            }
        },
        MuiTableCell: {
            head: {
                color: '#fff'
            },
            body: {
                color: '#B3B6C2'
            }
        },
        MuiIconButton: {
            root: {
                color: '#B3B6C2'
            }
        },
        MuiInputBase: {
            input: {
                color: '#B3B6C2'
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: '#1C2540',
                color: '#B3B6C2'
            }
        }
    }
})

export default theme;