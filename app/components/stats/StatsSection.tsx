import GroupsIcon from "@mui/icons-material/Groups";
import Paper from "@mui/material/Paper";
import {InfoCard} from "@/app/components/stats/InfoCard";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Card from "@mui/material/Card";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const STATS_DATA = [
    {
        id: 1,
        title: 'Members in Total',
        number: 154,
        icon: GroupsIcon,
        color: 'cuaternary.main',
    },
    {
        id: 2,
        title: 'Community Conservancies',
        number: 79,
        icon: GroupsIcon,
        color: 'tertiary.400',
    },
    {
        id: 3,
        title: 'Group Conservancies',
        number: 25,
        icon: GroupsIcon,
        color: 'secondary.main',
    },
    {
        id: 4,
        title: 'Private Conservancies',
        number: 46,
        icon: GroupsIcon,
        color: 'success.main',
    }
]

export default function StatsSection() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant='h5'>Statistics</Typography>
                </Grid>
                {STATS_DATA.map((stat) => (
                    <Grid item key={stat.id}>
                        <Card sx={{height: '100px', p: '20px', margin: '20px'}}>
                                <Typography fontSize={24} variant="subtitle1">
                                    {stat.number.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {stat.title}
                                </Typography>
                        </Card>
                        <Divider/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}