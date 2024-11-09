import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {FormControl, Stack} from "@mui/material";
import {useProjectQuery} from "@/app/components/helpers/api";
import {GeoJsonProperties} from "geojson";

export default function FeaturePopup({properties}: { properties: GeoJsonProperties }) {
    if (properties) {
        return (
            <>
                {Object.keys(properties).map((key) => (
                    <Stack key={`stack-${key}`} spacing={0.5} pb={2} pt={0}>
                        <Typography key={`title-${key}`}  variant="subtitle2"><em>{key}</em></Typography>
                        <Typography key={`value-${key}`} variant="body1" color="text.primary">
                            {properties[key]}
                        </Typography>
                    </Stack>
                ))}
            </>

        )
    }
}