import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme, makeStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './banner/Carousel'
import { Pagination } from '@material-ui/lab'


const useStyles = makeStyles(() => ({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "#004DFD",
        },
    },
}))

const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const navigate = useNavigate();

    const classes = useStyles()

    const { currency, symbol } = CryptoState()

    const fetchCoin = async () => {

        setLoading(true);
        try {
            const response = await axios.get(CoinList(currency))
            setCoins(response.data)
        } catch (error) {
            console.error('Error fetching coins List:', error)
        }
        setLoading(false)
    }

    console.log(coins);

    useEffect(() => {
        fetchCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: "dark",
        },
    })

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography
                    variant='h4'
                    style={{
                        margin: 18,
                        //  fontFamily:  "Monserret"
                    }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer component={Paper}>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "#004DFD" }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#004DFD" }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "white",
                                                fontWeight: "700",
                                                // fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map(row => {
                                        let profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                className={classes.row}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}
                                                    &nbsp; M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable