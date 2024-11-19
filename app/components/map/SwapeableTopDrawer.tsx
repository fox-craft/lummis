import React, {useContext} from "react";
import {Grid, Stack, SwipeableDrawer} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LandscapeSelector from "@/app/components/filter/LandscapeSelector";
import ConservancyTypeSelector from "@/app/components/filter/ConservancyTypeSelector";
import CountySelector from "@/app/components/filter/CountySelector";
import {MapContext} from "@/app/components/filter/MapContext";

export default function SwapeableTopDrawer () {
    const {filterOpen, setFilterOpen} = useContext(MapContext);
    const toggleDrawer = () => (event: any) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setFilterOpen(!filterOpen);
    };
    return (
        <React.Fragment>
            <SwipeableDrawer
                onOpen={toggleDrawer()}
                onClose={toggleDrawer()}
                anchor={'top'}
                variant="temporary"
                open={filterOpen}
                ModalProps={{
                    keepMounted: true,
                }}
                BackdropProps={{
                    hidden: true,
                }}
                PaperProps={{
                    sx: {
                        flexGrow: 1,
                        width: '33%',
                        // height: '100px',
                        mt: '16px',
                        ml: '30%',
                        borderRadius: '16px',
                        // display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: 'beige'
                    }
                }}
            >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <CountySelector/>
                    <LandscapeSelector/>
                    {/*<ConservancyTypeSelector/>*/}
                </Stack>
            </SwipeableDrawer>
        </React.Fragment>
    )
}