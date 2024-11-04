import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {
    FormControl,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextareaAutosize,
    TextField
} from "@mui/material";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {useMap} from "react-leaflet";
import {useProjectQuery} from "@/app/components/helpers/api";
import {Label} from "@mui/icons-material";

export default function InfoDrawer({featureId, open}: { featureId: number, open: boolean }) {
    const {data} = useProjectQuery(featureId)
    console.log(`New selected project ID ${featureId}`)
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
                '& .MuiDrawer-paper': {
                    width: 350,
                    boxSizing: 'border-box',
                    top: ['48px', '56px', '64px'],
                    height: 'auto',
                    bottom: 0,
                },
            }}
            variant="persistent"
        >
            {data && (
                <Box sx={{display: "flex", padding: 3}}>
                    <Stack spacing={3}>
                    {
                        Object.entries(data).map((key, value) => (
                                <Stack spacing={2} direction='column' key={key}>
                                    <Typography key={`${key}-${value}`}>{key}</Typography>
                                    <Typography key={`${key}xxx${value}`}>{value}</Typography>
                                </Stack>

                            )
                        )
                    }
                </Stack>
                </Box>
            )}

        </Drawer>)
}