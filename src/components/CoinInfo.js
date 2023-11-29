import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, ThemeProvider, createTheme, makeStyles, ButtonGroup, Button } from '@material-ui/core';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';
import chartDays from '../config/data';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        padding: 0,
    },
    chart: {
        width: '100%',
        borderRadius: 10,
        marginTop: 20,
    },
    button: {
        backgroundColor: 'black',
        color: 'white',
        border: `1px solid #004DFD`,
        borderRadius: '5px',
        margin: '10px',
        '&:hover': {
            backgroundColor: '#0239b9',
            color: 'white',
        },
    }
}));

const CoinInfo = ({ coin }) => {
    const [days, setDays] = useState(1);
    const [historicData, setHistoricData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currency } = CryptoState()

    const classes = useStyles();

    const fetchHistoricData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(HistoricalChart(coin?.id, days, currency));
            setHistoricData(response.data?.prices || []);
        } catch (error) {
            console.error('Error fetching coins history:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchHistoricData();
    }, [coin?.id, days, currency]);

    const handleButtonClick = (value) => {
        setDays(value);
    };

    return (
        <ThemeProvider theme={createTheme({ palette: { type: 'dark' } })}>
            <div className={classes.container}>
                {loading ? (
                    <CircularProgress style={{ color: '#004DF6' }} size={250} thickness={1} />
                ) : (
                    <div className={classes.chart}>
                        <VictoryChart
                            heme={VictoryTheme.material}
                            width={1000}
                            height={500}
                            padding={{ top: 40, bottom: 100, left: 100, right: 40 }}
                            domainPadding={{ x: 50 }}
                        >
                            <VictoryLine
                                data={historicData.map((coin) => ({ x: new Date(coin[0]), y: coin[1] }))}
                                style={{
                                    data: { stroke: '#004DF6' },
                                }}
                            />
                            <VictoryAxis
                                tickFormat={(t) => {
                                    let date = new Date(t);
                                    if (days === 1) {
                                        let time =
                                            date.getHours() > 12
                                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                                : `${date.getHours()}:${date.getMinutes()} AM`;
                                        return time;
                                    } else {
                                        return date.toLocaleDateString();
                                    }
                                }}
                                style={{
                                    axis: { stroke: 'gray' },
                                    ticks: { stroke: 'gray' },
                                    tickLabels: { fill: 'gray', fontSize: 15 },
                                }}
                            />
                            <VictoryAxis dependentAxis
                                style={{
                                    axis: { stroke: 'gray' },
                                    ticks: { stroke: 'gray' },
                                    tickLabels: { fill: 'gray', fontSize: 15 },
                                }}
                            />
                        </VictoryChart>
                    </div>
                )}
                <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                    {chartDays.map((day) => (
                        <Button
                            key={day.value}
                            onClick={() => handleButtonClick(day.value)}
                            className={classes.button}
                            style={{
                                backgroundColor: days === day.value ? '#004DFD' : 'black',
                            }}
                        >
                            {day.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </ThemeProvider>
    );
};

export default CoinInfo;