import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import StatsSection from "@/app/components/stats/StatsSection";
import {Copyright} from "@mui/icons-material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

export default function InfoDrawer({open}: { open: boolean }) {

    return (
        <Drawer
            open={open}
            anchor="right"
            style={{
                position: "absolute",
            }}
            sx={{
                width: 350,
                flexShrink: 0,
                paddingRight: '16px',
                '& .MuiDrawer-paper': {
                    width: 350,
                    boxSizing: 'border-box',
                    top: ['48px', '56px', '64px', ''],
                    height: 'auto',
                    bottom: 0,
                    borderRadius: '16px',
                    paddingRight: '16px'
                },
            }}
            variant="permanent"
            ModalProps={{keepMounted: true}}
        >
            <Box sx={{display: "flex", padding: 3}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant='h4'>LUMMIS</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'>
                            Land Management & Monitoring Information System is a web based
                            geospatial
                            platform developed to help KWCA and its various land scape association to manage and monitor
                            land
                            use base on community and conservation land use plan in community and conservancies across
                            the
                            country.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            By overlaying, land cover & land uses in these areas of interest with the designated land use plans,
                            the landscape can evaluate proper land use practices against recommended and assess their
                            efficiency. <b>Providing better planning framework for the future of these landscapes.</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <StatsSection/>
                    </Grid>
                    <Grid item >
                        <Copyright sx={{pt: 4}}/>
                    </Grid>
                </Grid>
            </Box>

        </Drawer>)
}