import * as React from "react";
import {useContext} from "react";
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import {Grid, MenuItem} from "@mui/material";
import {MapContext} from "@/app/components/filter/MapContext";
import {ConservancyType, ConservancyTypes} from "@/app/components/helpers/interfaces";


export default function ConservancyTypeSelector() {
    const {conservancyType, setConservancyType} = useContext(MapContext);
    const handleValueChange = (event: SelectChangeEvent) => {
        setConservancyType(event.target.value as string);
    };

    return (
        <Grid sx={{flexGrow: 1}}>
            <FormControl size="small" variant='standard' sx={{flexGrow: 1, m: 1, minWidth: 120}}>
                <InputLabel>Conservancy Type</InputLabel>
                <Select
                    autoWidth
                    label="Conservancy Type"
                    value={conservancyType}
                    onChange={handleValueChange}
                    variant='standard'
                    size='medium'
                    id='_selected_landscape'
                >
                    <MenuItem value=""><em>All</em></MenuItem>
                    {conservancy_types.map((type: ConservancyType) => (
                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

const conservancy_types: ConservancyTypes = [
    {
        "id": 1,
        "name": "Private",
    },
    {
        "id": 2,
        "name": "Group",
    },
    {
        "id": 3,
        "name": "Community",
    },
]