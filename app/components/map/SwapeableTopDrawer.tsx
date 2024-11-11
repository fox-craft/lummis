import React from "react";
import {Grid, SwipeableDrawer} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LandscapeSelector from "@/app/components/filter/LandscapeSelector";
import ConservancyTypeSelector from "@/app/components/filter/ConservancyTypeSelector";

export default function SwapeableTopDrawer () {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => (event: any) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setOpen(!open);
    };
    return (
        <React.Fragment>
            <SwipeableDrawer
                onOpen={toggleDrawer()}
                onClose={toggleDrawer()}
                anchor={'top'}
                variant="persistent"
                open={open}
                ModalProps={{
                    keepMounted: true,
                }}
                BackdropProps={{
                    hidden: true,
                }}
                PaperProps={{
                    sx: {
                        width: '33%',
                        height: '100px',
                        mt: '16px',
                        ml: '30%',
                        borderRadius: '16px',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }
                }}
            >
                <Box
                    sx ={{width: '33%', height: '100px', bgcolor: 'background.paper'}}
                    role='presentation'
                    onClick={toggleDrawer}
                >
                    <Grid container spacing={2}>
                        <Grid direction='row' item >
                            <LandscapeSelector/>
                        </Grid>
                        <Grid direction='row' item >
                            <ConservancyTypeSelector/>
                        </Grid>
                    </Grid>
                </Box>

            </SwipeableDrawer>


        </React.Fragment>
    )
}