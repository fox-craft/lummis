import React, {useContext} from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import {Feature, GeoJsonProperties, Geometry} from "geojson";
import {MapContext} from "@/app/components/filter/MapContext";

export default function FeaturePopup({feature}: { feature: Feature<Geometry, GeoJsonProperties> }) {
    const {detailedPopupOpen, setDetailedPopupOpen} = useContext(MapContext);
    const openDetailedPopup = () => {
        setDetailedPopupOpen(!detailedPopupOpen)
    }

    const keys = Object.keys(feature.properties as { [key: string]: any });
    const value = (key: string) => {
        if (feature && feature.properties) {
            return feature.properties[key]
        } else {
            return ''
        }
    }
    if (feature) {
        return (
            <>
                {keys.filter((key) => key.toLowerCase().includes('NAME'.toLowerCase()) || key.toLowerCase().includes('DESIG'.toLowerCase())).map((key) => (
                    <Stack key={`stack-${key}`} spacing={0.5} pb={2} pt={0}>
                        {/*<Typography key={`title-${key}`} variant="subtitle2"><em>{key}</em></Typography>*/}
                        <Typography key={`value-${key}`} variant="body1" color="text.primary">
                            {value(key)}
                        </Typography>
                    </Stack>
                ))}
                <Button variant="outlined" onClick={openDetailedPopup}>More Info</Button>
            </>

        )
    }
}