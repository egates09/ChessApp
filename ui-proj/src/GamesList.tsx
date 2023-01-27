import React, { useEffect, useState } from 'react'
import ChessGames from "../models/ChessGames"
import { Divider, Grid, List, Message } from "semantic-ui-react";
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export default function GamesList() {
    const defaultChessGames: ChessGames = {
        games: []
    }

    const [games, setGames] = useState(defaultChessGames);

    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [draws, setDraws] = useState(0);

    const [winMates, setWinMates] = useState(0);
    const [winTimes, setWinTimes] = useState(0);
    const [winResigns, setWinResigns] = useState(0);
    const [winAbandons, setWinAbandons] = useState(0);

    const [lossMates, setLossMates] = useState(0);
    const [lossTimes, setLossTimes] = useState(0);
    const [lossResigns, setLossResigns] = useState(0);
    const [lossAbandons, setLossAbandons] = useState(0);

    const [drawRepetition, setDrawRepetition] = useState(0);
    const [drawInsufficient, setDrawInsufficient] = useState(0);
    const [drawStalemate, setDrawStalemate] = useState(0);

    const year = moment().get('year');
    const month = Number(moment().get('month') + 1) < 10 ? `0${moment().get('month') + 1}` : moment().get('month') + 1;

    let lineDataArray: number[] = [];
    let lineDataLabels: string[] = [];

    const pieData = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [
            {
                label: 'Wins/Losses/Draws',
                data: [wins, losses, draws],
                backgroundColor: [
                    'rgba(32, 252, 3, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(89, 89, 89, 0.2)'
                ],
                borderColor: [
                    'rgba(32, 252, 3, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(89, 89, 89, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: lineDataLabels,
        datasets: [
            {
                axis: 'x',
                label: 'ELO',
                data: lineDataArray,
                borderColor: 'rgb(52, 110, 235)',
                backgroundColor: 'rgba(52, 110, 235, 0.5)'
            }
        ]
    };

    const winData = {
        labels: ['Checkmate', 'Timeout', 'Resignation', 'Abandoned'],
        datasets: [
            {
                label: 'Frequency',
                data: [winMates, winTimes, winResigns, winAbandons],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const lossData = {
        labels: ['Checkmate', 'Timeout', 'Resignation', 'Abandoned'],
        datasets: [
            {
                label: 'Frequency',
                data: [lossMates, lossTimes, lossResigns, lossAbandons],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const drawData = {
        labels: ['Insuffienct Material', 'Repetition', 'Stalemate'],
        datasets: [
            {
                label: 'Frequency',
                data: [drawInsufficient, drawRepetition, drawStalemate],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const [line, setLine] = useState(lineData)

    const lineOptions = {
        responsive: true,
        config: {
            type: 'line'
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
                min: 950,
                max: 1250
            },
            x: {
                ticks: {
                    display: false
                }
            }
        }
    };

    const winConditionsOptions = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Win Conditions',
            }
        }
    }

    const lossConditionsOptions = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Loss Conditions',
            }
        }
    }

    const drawConditionsOptions = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Draw Conditions',
            }
        }
    }

    const getGames = async () => {
        await fetch(`https://api.chess.com/pub/player/egates09/games/${year}/${month}`)
            .then((response) => response.json())
            .then((data) => { setGames(data); calculateWinLoss(data); calculateLineChart(data) })
    }

    const calculateWinLoss = (data: ChessGames) => {
        let win = 0;
        let loss = 0;
        let draw = 0;

        let winMate = 0;
        let winTime = 0;
        let winResign = 0;
        let winAbandon = 0;

        let lossMate = 0;
        let lossTime = 0;
        let lossResign = 0;
        let lossAbandon = 0;

        let drawRepetition = 0;
        let drawInsufficient = 0;
        let drawStalemate = 0;

        data.games.map((e) => {
            if (e.white.username === 'egates09' && e.white.result === 'win') {
                win++;

                // my win conditions
                switch (e.black.result) {
                    case 'checkmated': winMate++; break;
                    case 'timeout': winTime++; break;
                    case 'resigned': winResign++; break;
                    case 'abandoned': winAbandon++; break;
                    default: break;
                }
            }
            else if (e.white.result === 'win') {
                loss++

                // my loss conditions
                switch (e.black.result) {
                    case 'checkmated': lossMate++; break;
                    case 'timeout': lossTime++; break;
                    case 'resigned': lossResign++; break;
                    case 'abandoned': lossAbandon++; break;
                    default: break;
                }
            }
            else if (e.black.result === 'win') { //??? TODO: <----
                loss++

                // my win conditions
                switch (e.white.result) {
                    case 'checkmated': lossMate++; break;
                    case 'timeout': lossTime++; break;
                    case 'resigned': lossResign++; break;
                    case 'abandoned': lossAbandon++; break;
                    default: break;
                }
            }
            else if (e.white.result === e.black.result) {
                draw++
                switch (e.white.result) {
                    case 'repetition': drawRepetition++; break;
                    case 'timevsinsufficient': drawInsufficient++; break;
                    case 'stalemate': drawStalemate++; break;
                    default: break;
                }
            }
        })

        setWins(win); setLosses(loss); setDraws(draw);
        setWinMates(winMate); setWinTimes(winTime); setWinResigns(winResign); setWinAbandons(winAbandon);
        setLossMates(lossMate); setLossTimes(lossTime); setLossResigns(lossResign); setLossAbandons(lossAbandon);
        setDrawRepetition(drawRepetition); setDrawInsufficient(drawInsufficient); setDrawStalemate(drawStalemate);
    }

    const calculateLineChart = (data: ChessGames) => {
        data.games.map((e) => {
            if (e.white.username === 'egates09') {
                lineDataArray.push(e.white.rating)
            }
            else {
                lineDataArray.push(e.black.rating)
            }

            lineDataLabels.push(e.white.username + " vs. " + e.black.username)
        })

        lineDataArray = lineDataArray.reverse();
        lineDataLabels = lineDataLabels.reverse();

        setLine({
            labels: lineDataLabels,
            datasets: [
                {
                    axis: 'x',
                    label: 'ELO',
                    data: lineDataArray,
                    borderColor: 'rgb(52, 110, 235)',
                    backgroundColor: 'rgba(52, 110, 235, 0.5)'
                }
            ]
        })
    }

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
            <Divider inverted horizontal>Recent Games {`(${month}/${year})`} </Divider>

            <div style={{ padding: '2%', height: '350px', overflowY: 'auto', paddingLeft: '16%', paddingRight: '16%' }}>
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
                                                        <Message color={game.white.result === 'win' && game.white.username === 'egates09' ? 'green' : game.white.result === game.black.result ? 'grey' : 'red'}>
                                                            <Message.Header>
                                                                <div style={{ display: 'flex' }}>
                                                                    <span>{game.white.result === 'win' && game.white.username === 'egates09' ? 'WIN' : game.white.result === game.black.result ? 'DRAW' : 'LOSE'}</span>
                                                                    <span style={{ marginLeft: game.white.result === game.black.result ? '17%' : '20%' }}>{game.white.username} {`(${game.white.rating})`} vs. {game.black.username} {`(${game.black.rating})`}</span>
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
            <Divider inverted horizontal>Data</Divider>
            <Grid style={{ padding: '1%' }}>
                <Grid.Row columns={5}>
                    <Grid.Column> Total Games: {games.games.length}</Grid.Column>
                    <Grid.Column> Total Wins: {wins}</Grid.Column>
                    <Grid.Column> Total Losses: {losses}</Grid.Column>
                    <Grid.Column> Total Draws: {draws}</Grid.Column>
                    <Grid.Column> W/L/D %: {Math.round((wins / games.games.length) * 100)}/{Math.round((losses / games.games.length) * 100)}/{Math.round((draws / games.games.length) * 100)}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Pie data={pieData} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Line options={lineOptions}
                            data={line}
                        />
                    </Grid.Column>
                    <Grid.Column width={1} />
                </Grid.Row>
                <Divider inverted horizontal>W/L/D Conditions</Divider>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Doughnut data={winData} options={winConditionsOptions} />
                    </Grid.Column>
                    <Grid.Column>
                        <Doughnut data={lossData} options={lossConditionsOptions} />
                    </Grid.Column>
                    <Grid.Column>
                        <Doughnut data={drawData} options={drawConditionsOptions} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
