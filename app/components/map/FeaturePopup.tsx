import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {FormControl, Stack} from "@mui/material";
import {useProjectQuery} from "@/app/components/helpers/api";

export default function FeaturePopup({featureId}: { featureId: number }) {
    const {data} = useProjectQuery(featureId)
    if (data) {
        return (
            <Stack spacing={0.5} pb={2} pt={0}>
                <Typography variant="h5">{data.projectName}</Typography>
                <Typography variant="body1" color="text.secondary">
                    {data.status}
                </Typography>
            </Stack>
        )
    }
    return "Loading.."

}