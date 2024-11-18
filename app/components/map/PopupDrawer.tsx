import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import {GeoJsonProperties} from "geojson";
import React, {useContext} from "react";
import {MapContext} from "@/app/components/filter/MapContext";
import Typography from "@mui/material/Typography";
import FeaturePopup from "@/app/components/map/FeaturePopup";

export default function PopupDrawer() {
    const {selectedFeature, detailedPopupOpen} = useContext(MapContext);

    const keys = () => {
        if (selectedFeature) {
            return Object.keys(selectedFeature.properties as { [key: string]: any });
        }
    }

    const value = (key: string) => {
        if (selectedFeature && selectedFeature.properties) {
            return selectedFeature.properties[key]
        } else {
            return ''
        }
    }
    return (
        <Drawer
            open={detailedPopupOpen}
            anchor="right"
            style={{
                position: "absolute",
            }}
            sx={{
                width: 350,
                mr: '16px',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 350,
                    boxSizing: 'border-box',
                    top: ['48px', '56px', '64px', ''],
                    height: 'auto',
                    bottom: 0,
                    borderRadius: '16px',
                    bgcolor: '#88C273',
                },
            }}
            ModalProps={{keepMounted: true}}
            variant="permanent"
        >
        </Drawer>)
}