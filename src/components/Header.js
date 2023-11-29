import {
    AppBar, Toolbar, Container, Typography,
    Select, MenuItem, makeStyles, createTheme, ThemeProvider
} from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({
    title: {
        flex: 1,
        color: "#004DFD",
        fontWeight: "bold",
        cursor: "pointer",
    },
    select: {
        '& .MuiSelect-icon': {
            color: 'white', // Sets the dropdown arrow color to white
        },
        '& .MuiSelect-root': {
            color: 'white', // Sets the text color of the selected item to white
        },
        '& .MuiMenu-paper': {
            backgroundColor: theme.palette.primary.dark, // Optional: Sets the dropdown background color
        },
    },
}));

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
    },
    overrides: {
        MuiMenuItem: {
            root: {
                color: 'black',
            },
        },
    },
});

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const {currency, setCurrency} = CryptoState()

    // console.log(currency)

    return (
        <ThemeProvider theme={customTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate("/")}
                            className={classes.title}
                            variant='h6'>
                            Cryptous
                        </Typography>
                        <Select
                            className={classes.select}
                            variant='outlined'
                            defaultValue="USD"
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15,
                            }}
                            value={currency}
                            onChange={(e)=> setCurrency(e.target.value)}
                        >
                            <MenuItem style={{backgroundColor: 'white'}} value={"USD"}>USD</MenuItem>
                            <MenuItem style={{backgroundColor: 'white'}}value={"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
