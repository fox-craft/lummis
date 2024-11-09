import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Modal, Popover} from "@mui/material";
import React, {FC, useState} from "react";
import {GeoJsonProperties} from "geojson";

interface PopupProps {
    feature: GeoJsonProperties,
    modalOpen: boolean
}

export const MapPopup: FC<PopupProps> = ({
                                             feature,
                                             modalOpen
                                         }) => {
    const [open, setOpen] = useState(modalOpen);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Popover
            id='map-popup'
            onClose={handleClose}
            closeAfterTransition
            open={open}

            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Box
                sx={{
                    display: "inline",
                    position: "left",
                    top: "50%",
                    right: "20%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    backgroundColor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {/*{feature["crop"]} */}
                </Typography>
                <Typography variant="h5" component="div">
                    be{"bull"}nev{"bull"}o{"bull"}lent
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {/* {feature["farmer_nam"]} */}
                </Typography>
                <Typography variant="body2">
                    {/* {feature["crop_desc"]} */}
                    <br/>
                    {/* {feature["farmer_id"]} */}
                </Typography>
            </Box>
        </Popover>
    );
}
