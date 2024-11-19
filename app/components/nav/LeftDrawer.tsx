'use client'
import {styled, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import ProSidebar from "@/app/components/nav/ProSidebar";
import List from "@mui/material/List";
import {placeHolderItems} from "@/app/listItems";
import * as React from "react";
import {useMediaQuery} from "@mui/material";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function LeftDrawer() {
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [open, setOpen] = React.useState(!isMobile);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <React.Fragment>
            <Drawer variant="permanent" open={open} sx={{bgcolor: '#8e7b12'}}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <Typography variant='h5' component='h2'>
                        <b>LUMMIS</b>
                    </Typography>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Toolbar>
                <Divider/>
                <ProSidebar/>

                <Divider sx={{mt: 'auto'}}/>
                <List>
                    {placeHolderItems}
                </List>
            </Drawer>
        </React.Fragment>
    )
};