import GroupsIcon from "@mui/icons-material/Groups";
import Paper from "@mui/material/Paper";
import {InfoCard} from "@/app/components/dashboard/InfoCard";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Card from "@mui/material/Card";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

const STATS_DATA = [
    {
        id: 1,
        title: 'Target Beneficiaries',
        number: 50300,
        icon: GroupsIcon,
        color: 'cuaternary.main',
    },
    {
        id: 2,
        title: 'People Reached',
        number: 33300,
        icon: GroupsIcon,
        color: 'tertiary.400',
    },
    {
        id: 3,
        title: 'Active Interventions',
        number: 150,
        icon: GroupsIcon,
        color: 'secondary.main',
    },
    {
        id: 4,
        title: 'Completed Interventions',
        number: 300,
        icon: GroupsIcon,
        color: 'success.main',
    }
]

export default function StatsSection() {
    return (
        <>
            <Grid container spacing={2}>
                {STATS_DATA.map((stat) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.id}>
                        <Card sx={{height: '100px', p: '20px'}}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <GroupsIcon
                                    sx={{
                                        fontSize: 70,
                                        color: stat.color,
                                    }}
                                    color="disabled"
                                />
                                <span>
                                <Typography fontSize={30} variant="subtitle1">
                                    {stat.number.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {stat.title}
                                </Typography>
                                    </span>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}