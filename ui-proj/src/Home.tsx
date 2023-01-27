import React, { useEffect, useState } from "react";
import Player from "../models/Player"
import { Card, Container, Flag, Grid, Image, Loader, Segment, Reveal, Button } from "semantic-ui-react";
import moment from "moment";
import Stats from "./Stats";
import Statistics from "../models/Statistics";

export default function Home() {
    const player: Player = {
        id: "",
        url: "",
        username: "",
        player_id: 0,
        title: "",
        status: "",
        name: "",
        avatar: "",
        location: "",
        country: "",
        joined: 0,
        last_online: 0,
        followers: 0,
        is_streamer: false,
        twitch_url: "",
        fide: 0
    }

    const defaultStats: Statistics = {
        chess_blitz: {
            best: { date: 0, game: "", rating: 0 },
            last: { date: 0, rating: 0, rd: 0 },
            record: { draw: 0, loss: 0, win: 0 }
        },
        chess_bullet: {
            best: { date: 0, game: "", rating: 0 },
            last: { date: 0, rating: 0, rd: 0 },
            record: { draw: 0, loss: 0, win: 0 }
        },
        chess_rapid: {
            best: { date: 0, game: "", rating: 0 },
            last: { date: 0, rating: 0, rd: 0 },
            record: { draw: 0, loss: 0, win: 0 }
        }
    }

    const [playerData, setPlayerData] = useState(player)
    const [stats, setStats] = useState(defaultStats);

    let loading: boolean = false;

    const getPlayerData = async () => {
        await fetch('https://api.chess.com/pub/player/egates09')
            .then((response) => response.json())
            .then((data) => setPlayerData(data));
    }

    const getStats = async () => {
        await fetch('https://api.chess.com/pub/player/egates09/stats')
            .then((response) => response.json())
            .then((data) => setStats(data))
    }

    useEffect(() => {
        loading = true;
        Promise.all([getPlayerData(), getStats()]).finally(() => { loading = false; })
    }, [])

    return (
        <>
            {loading &&
                <Loader />
            }
            {
                !loading &&
                <Segment inverted style={{ padding: '2% 0' }}>
                    <Container>
                        <Grid textAlign="center">
                            <Grid.Row columns={2} style={{ display: 'flex', alignItems: 'center' }}>
                                <Grid.Column textAlign="center" width={6}>
                                    {/* <Button color="blue" href={playerData.url} target="_blank">View Profile</Button> */}
                                    <Card color='pink'>
                                        <Reveal animated='move up'>
                                            <Reveal.Content visible>
                                                <Image src={playerData.avatar} size="large" />
                                            </Reveal.Content>
                                            <Reveal.Content hidden>
                                                <Image src={require('./scarface.jpeg')} size="large" />
                                            </Reveal.Content>
                                        </Reveal>

                                        <Card.Content>
                                            <Card.Header>
                                                <span style={{ marginLeft: '2%' }}>{playerData.name}</span>
                                                <Flag style={{ marginLeft: '2%' }} name='us' />
                                            </Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Last Online: {moment.unix(playerData.last_online).format("MM/DD/YYYY, h:mm:ss A")}</span>
                                            </Card.Meta>
                                            <Card.Description>
                                                You need people like me so you can point your fingers and say,
                                                <br />
                                                <br />
                                                "That's the guy who is bad at chess."
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column style={{ overflowY: 'auto', height: '605px' }}>
                                    <Stats data={stats} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            }

        </>
    )
}