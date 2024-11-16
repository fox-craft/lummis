import React, {useContext} from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {FormControl, Stack} from "@mui/material";
import {useProjectQuery} from "@/app/components/helpers/api";
import {Feature, GeoJsonProperties} from "geojson";
import {MapContext} from "@/app/components/filter/MapContext";

export default function FeaturePopup({feature}: { feature: Feature }) {
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

                {keys.filter((key) => key.toLowerCase().includes('NAME'.toLowerCase())).map((key) => (
                    <Stack key={`stack-${key}`} spacing={0.5} pb={2} pt={0}>
                        <Typography key={`title-${key}`} variant="subtitle2"><em>{key}</em></Typography>
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