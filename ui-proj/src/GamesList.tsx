import React, { useEffect, useState } from 'react'
import ChessGames from "../models/ChessGames"
import { Divider, Grid, List, Message } from "semantic-ui-react";
import moment from 'moment';

export default function GamesList() {
    const defaultChessGames: ChessGames = {
        games: []
    }

    const [games, setGames] = useState(defaultChessGames);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const year = moment().get('year');
    const month = Number(moment().get('month') + 1) < 10 ? `0${moment().get('month') + 1}` : moment().get('month') + 1;

    const getGames = async () => {
        await fetch(`https://api.chess.com/pub/player/egates09/games/${year}/${month}`)
            .then((response) => response.json())
            .then((data) => { setGames(data); calculateWinLoss(data); })
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
            <Grid style={{ padding: '1%' }}>
                <Grid.Row columns={4} style={{ paddingLeft: '4%' }}>
                    <Grid.Column> Total Games: {games.games.length}</Grid.Column>
                    <Grid.Column> Total Wins: {wins}</Grid.Column>
                    <Grid.Column> Total Losses: {losses}</Grid.Column>
                    <Grid.Column> W/L: {(wins / games.games.length).toFixed(2)}/{(losses / games.games.length).toFixed(2)}%</Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
