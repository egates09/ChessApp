import React, { useEffect, useState } from 'react'
import ChessGames from "../models/ChessGames"
import { Divider, Grid, List, Message } from "semantic-ui-react";
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export default function GamesList() {
    const defaultChessGames: ChessGames = {
        games: []
    }

    const [games, setGames] = useState(defaultChessGames);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const year = moment().get('year');
    const month = Number(moment().get('month') + 1) < 10 ? `0${moment().get('month') + 1}` : moment().get('month') + 1;

    let lineDataArray: number[] = [];
    let lineDataLabels: string[] = [];

    let lineTestData: number[] = [1000, 1200, 1100, 1050, 1250, 1150];
    let lineTestLabel: string[] = ["egates09 vs. T", "egates09 vs. A", "egates09 vs. F", "egates09 vs. B", "egates09 vs. G", "egates09 vs. Q"];

    const pieData = {
        labels: ['Wins', 'Losses'],
        datasets: [
            {
                label: 'Wins/Losses',
                data: [wins, losses],
                backgroundColor: [
                    'rgba(32, 252, 3, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(32, 252, 3, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        // labels: lineDataLabels,
        labels: lineTestLabel,
        datasets: [
            {
                axis: 'x',
                label: 'ELO',
                // data: lineDataArray,
                data: lineTestData,
                // {
                //     data: lineDataArray,
                //     min: 800,
                //     max: 1200
                // },
                borderColor: 'rgb(52, 110, 235)',
                backgroundColor: 'rgba(52, 110, 235, 0.5)'
            }
        ]
    };

    const lineOptions = {
        responsive: true,
        config: {
            type: 'line',
            // data: lineTestData,
            // data: lineData,
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'ELO Rating Over Time',
            }
        },
        scales: {
            y: {
                min: 800,
                max: 1400
            },
            x: {
                ticks: {
                    display: false //this will remove only the label
                }
            }
        }
    };

    const getGames = async () => {
        await fetch(`https://api.chess.com/pub/player/egates09/games/${year}/${month}`)
            .then((response) => response.json())
            .then((data) => { setGames(data); calculateWinLoss(data); calculateLineChart(data) })
    }

    const calculateWinLoss = (data: ChessGames) => {
        let win = 0;
        let loss = 0;

        data.games.map((e) => {
            if (e.white.username === 'egates09' && e.white.result === 'win') {
                win++;
            }
            else {
                loss++
            }
        })

        setWins(win); setLosses(loss);
    }

    const calculateLineChart = (data: ChessGames) => {
        data.games.map((e, i) => {
            if (i < 5) {
                if (e.white.username === 'egates09') {
                    lineDataArray.push(e.white.rating)
                }
                else {
                    lineDataArray.push(e.black.rating)
                }

                lineDataLabels.push(e.white.username + " vs. " + e.black.username)
            }

        })

        // lineDataArray = lineDataArray.reverse();
        // lineDataLabels = lineDataLabels.reverse();

        console.log(lineDataArray);
        console.log(lineDataLabels);
    }

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
            <Divider inverted horizontal>egates09's Recent Games {`(${month}/${year})`} </Divider>

            <div style={{ padding: '2%', height: '500px', overflowY: 'auto', paddingLeft: '15%', paddingRight: '15%' }}>
                <Grid>
                    {
                        games.games.map((game, i) => {
                            return (
                                <Grid.Row key={i} style={{ padding: 0 }}>
                                    <Grid.Column>

                                        <List divided relaxed>
                                            <List.Item>
                                                <List.Content verticalAlign='middle'>
                                                    <List.Header as='a'
                                                        onClick={() => { window.open(game.url) }}>

                                                        <Message color={game.white.result === 'win' && game.white.username === 'egates09' ? 'green' : 'red'}>
                                                            <Message.Header>
                                                                <div>
                                                                    {game.time_class.toUpperCase()}: {`(${game.white.rating})`} {game.white.username} vs. {`(${game.black.rating})`} {game.black.username}
                                                                </div>
                                                            </Message.Header>
                                                        </Message>
                                                    </List.Header>
                                                </List.Content>
                                            </List.Item>
                                        </List>

                                    </Grid.Column>
                                </Grid.Row>
                            )
                        })
                    }
                </Grid>
            </div>
            <br />
            <Divider inverted horizontal>egates09's Recent Games Data</Divider>
            <Grid style={{ padding: '1%' }}>
                <Grid.Row columns={4} style={{ paddingLeft: '4%' }}>
                    <Grid.Column> Total Games: {games.games.length}</Grid.Column>
                    <Grid.Column> Total Wins: {wins}</Grid.Column>
                    <Grid.Column> Total Losses: {losses}</Grid.Column>
                    <Grid.Column> W/L: {(wins / games.games.length).toFixed(2)}/{(losses / games.games.length).toFixed(2)}%</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Pie data={pieData} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Line options={lineOptions} data={lineData} />
                    </Grid.Column>
                    <Grid.Column width={1} />
                </Grid.Row>
            </Grid>
        </>
    )
}
