import React, { useEffect, useState } from 'react'
import Statistics from "../models/Statistics"
import { Divider, Statistic } from "semantic-ui-react";
import moment from 'moment';

interface StatsProps {
    data: Statistics,
}

export default function Stats(props: StatsProps) {
    const [blitzTotals, setBlitzTotals] = useState(0);
    const [bulletTotals, setBulletTotals] = useState(0);
    const [rapidTotals, setRapidTotals] = useState(0);

    const setTotals = () => {
        let blitz = 0;
        let bullet = 0;
        let rapid = 0;

        blitz += props.data.chess_blitz.record.draw + props.data.chess_blitz.record.win + props.data.chess_blitz.record.loss;
        bullet += props.data.chess_bullet.record.draw + props.data.chess_bullet.record.win + props.data.chess_bullet.record.loss;
        rapid += props.data.chess_rapid.record.draw + props.data.chess_rapid.record.win + props.data.chess_rapid.record.loss;

        setBlitzTotals(blitz);
        setBulletTotals(bullet);
        setRapidTotals(rapid);
    }

    useEffect(() => {
        setTotals();
    }, [props]);

    return (
        <>
            <Divider inverted horizontal>General Statistics</Divider>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Statistic size='mini' color='purple' inverted>
                    <Statistic.Value>{blitzTotals}</Statistic.Value>
                    <Statistic.Label>Blitz Games</Statistic.Label>
                </Statistic>
                <Statistic size='mini' color='red' inverted>
                    <Statistic.Value>{props.data.chess_blitz.record.loss}</Statistic.Value>
                    <Statistic.Label>Losses</Statistic.Label>
                </Statistic>
                <Statistic size='mini' color='green' inverted>
                    <Statistic.Value>{props.data.chess_blitz.record.win}</Statistic.Value>
                    <Statistic.Label>Wins</Statistic.Label>
                </Statistic>
                <Statistic size='mini' inverted>
                    <Statistic.Value>{props.data.chess_blitz.record.draw}</Statistic.Value>
                    <Statistic.Label>Draws</Statistic.Label>
                </Statistic>
            </div>

            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Statistic size='mini' color='purple' inverted>
                    <Statistic.Value>{bulletTotals}</Statistic.Value>
                    <Statistic.Label>Bullet Games</Statistic.Label>
                </Statistic>
                <Statistic size='mini' color='red' inverted>
                    <Statistic.Value>{props.data.chess_bullet.record.loss}</Statistic.Value>
                    <Statistic.Label>Losses</Statistic.Label>
                </Statistic>
                <Statistic size='mini' color='green' inverted>
                    <Statistic.Value>{props.data.chess_bullet.record.win}</Statistic.Value>
                    <Statistic.Label>Wins</Statistic.Label>
                </Statistic>
                <Statistic size='mini' inverted>
                    <Statistic.Value>{props.data.chess_bullet.record.draw}</Statistic.Value>
                    <Statistic.Label>Draws</Statistic.Label>
                </Statistic>
            </div>

            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Statistic size='mini' color='purple' inverted>
                    <Statistic.Value>{rapidTotals}</Statistic.Value>
                    <Statistic.Label>Rapid Games</Statistic.Label>
                </Statistic>
                <Statistic size='mini' color='red' inverted>
                    <Statistic.Value>{props.data.chess_rapid.record.loss}</Statistic.Value>
                    <Statistic.Label>Losses</Statistic.Label>
                </Statistic>
                <Statistic size='mini' color='green' inverted>
                    <Statistic.Value>{props.data.chess_rapid.record.win}</Statistic.Value>
                    <Statistic.Label>Wins</Statistic.Label>
                </Statistic>
                <Statistic size='mini' inverted>
                    <Statistic.Value>{props.data.chess_rapid.record.draw}</Statistic.Value>
                    <Statistic.Label>Draws</Statistic.Label>
                </Statistic>
            </div>

            <Divider inverted horizontal>ELO Statistics</Divider>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Statistic size='mini' color='violet' inverted>
                    <Statistic.Value>{props.data.chess_blitz.last.rating}</Statistic.Value>
                    <Statistic.Label>Current Blitz Rating</Statistic.Label>
                    <h6 style={{ marginTop: '0', marginBottom: '0' }}>{moment.unix(props.data.chess_blitz.last.date).format("MM/DD/YYYY")}</h6>
                </Statistic>
                <Statistic size='mini' color='orange' inverted>
                    <Statistic.Value>{props.data.chess_blitz.best.rating}</Statistic.Value>
                    <Statistic.Label>Best Blitz Rating</Statistic.Label>
                    <h6 style={{ marginTop: '0', marginBottom: '0' }}>{moment.unix(props.data.chess_blitz.best.date).format("MM/DD/YYYY")}</h6>
                </Statistic>
            </div>

            <Divider style={{ marginTop: '0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Statistic size='mini' color='violet' inverted style={{ marginBottom: '0' }}>
                    <Statistic.Value>{props.data.chess_bullet.last.rating}</Statistic.Value>
                    <Statistic.Label>Current Bullet Rating</Statistic.Label>
                    <h6 style={{ marginTop: '0', marginBottom: '0' }}>{moment.unix(props.data.chess_bullet.last.date).format("MM/DD/YYYY")}</h6>
                </Statistic>
                <Statistic size='mini' color='orange' inverted style={{ marginBottom: '0' }}>
                    <Statistic.Value>{props.data.chess_bullet.best.rating}</Statistic.Value>
                    <Statistic.Label>Best Bullet Rating</Statistic.Label>
                    <h6 style={{ marginTop: '0', marginBottom: '0' }}>{moment.unix(props.data.chess_bullet.best.date).format("MM/DD/YYYY")}</h6>
                </Statistic>
            </div>

            <Divider style={{ marginTop: '0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Statistic size='mini' color='violet' inverted style={{ marginBottom: '0' }}>
                    <Statistic.Value>{props.data.chess_rapid.last.rating}</Statistic.Value>
                    <Statistic.Label>Current Rapid Rating</Statistic.Label>
                    <h6 style={{ marginTop: '0', marginBottom: '0' }}>{moment.unix(props.data.chess_rapid.last.date).format("MM/DD/YYYY")}</h6>
                </Statistic>
                <Statistic size='mini' color='orange' inverted style={{ marginBottom: '0' }}>
                    <Statistic.Value>{props.data.chess_rapid.best.rating}</Statistic.Value>
                    <Statistic.Label>Best Rapid Rating</Statistic.Label>
                    <h6 style={{ marginTop: '0', marginBottom: '0' }}>{moment.unix(props.data.chess_rapid.best.date).format("MM/DD/YYYY")}</h6>
                </Statistic>
            </div>
        </>
    )
}
