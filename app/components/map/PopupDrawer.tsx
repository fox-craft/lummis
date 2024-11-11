import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import {GeoJsonProperties} from "geojson";

export default function InfoDrawer({properties, open}: { properties: GeoJsonProperties, open: boolean }) {
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
                    top: ['48px', '56px', '64px', ''],
                    height: 'auto',
                    bottom: 0,
                    borderRadius: '16px'
                },
            }}
            ModalProps={{keepMounted: true}}
            variant="permanent"
        >
            {properties && (
                <Box sx={{display: "flex", padding: 3}}>
                    <Stack spacing={3}>
                    </Stack>
                </Box>
            )}

        </Drawer>)
}