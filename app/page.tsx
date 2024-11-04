'use client'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "@/app/components/dashboard/Chart";
import Deposits from "@/app/components/dashboard/Deposits";
import Orders from "@/app/components/dashboard/Orders";
import Container from "@mui/material/Container";
import * as React from "react";
import {Copyright} from "@mui/icons-material";
import {InfoCard} from "@/app/components/dashboard/InfoCard";
import {blue, green, purple} from "@mui/material/colors";
import {useProjectsQuery} from "@/app/components/helpers/api";
import {useContext, useEffect} from "react";
import {FilterContext} from "@/app/components/filter/FilterContext";
import Projects from "@/app/components/dashboard/Projects";
import {number} from "prop-types";
import StatsSection from "@/app/components/dashboard/StatsSection";
import PageHeader from "@/app/components/helpers/PageHeader";
import {Breadcrumbs} from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";


export default function Dashboard() {
    const {countyName, setProjects, projects} = useContext(FilterContext);
    var completedProjects = 0;
    var inprogressProjects = 0;
    var amountDisbursed = 0;
    var totalPopulation = 0;

   const {data} = useProjectsQuery(countyName)

    useEffect(() => {
        if (data) {
            const cp = data.reduce((status: any, project: any) => status.set(project.status, (status.get(project.status) ?? 0) +1), new  Map<string, number>())
            cp.forEach((count: number, status: string) => console.log(`Status ${status}: Count ${count}`))
            completedProjects = cp.completed;
            inprogressProjects = cp.completed;
        }

    }, [data])

    return (
        <>
            <PageHeader title="Dashboard 03">
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                        textTransform: 'uppercase',
                    }}
                >
                    <Link underline="hover" href="#!">
                        FLLOCA
                    </Link>
                    <Typography color="text.tertiary">Dashboard</Typography>
                </Breadcrumbs>
            </PageHeader>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <StatsSection/>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Chart />
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Deposits />
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Projects />
                        </Paper>
                    </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </>
    );
}
