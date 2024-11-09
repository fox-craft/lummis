import * as React from "react";
import {useContext, useState} from "react";
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import {Grid, MenuItem} from "@mui/material";
import {FilterContext} from "@/app/components/filter/FilterContext";
import {Landscapes} from "@/app/components/helpers/api";


export default function LandscapeSelector() {
    const {landscape, setLandscape, landscapeId, startDate, endDate} = useContext(FilterContext);
    const [selectedCounty, setSelectedCounty] = useState<string>('')

    const handleLandscapeChange = (event: SelectChangeEvent<string>) => {
        setLandscape(event.target.value as string);
    };

    return (
        <Grid sx={{flexGrow: 1}}>
            <FormControl size="small" variant='standard' sx={{flexGrow: 1, m: 1, minWidth: 120}}>
                <InputLabel>Select Landscape</InputLabel>
                <Select
                    autoWidth
                    label="County"
                    value={landscape}
                    onChange={handleLandscapeChange}
                    variant='standard'
                    size='small'
                    id='_selected_landscape'
                >
                    <MenuItem value=""><em>All</em></MenuItem>
                    {landscapes.map(scape => (
                        <MenuItem key={scape.id} value={scape.id}>{scape.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

const landscapes: Landscapes = [
    {
        "id": 1,
        "name": "Amboseli Ecosystem Trust",
        "counties": ["Kajiado"]
    },
    {
        "id": 2,
        "name": "Laikipia Wildlife Forum",
        "counties": ["Laikipia"]
    },
    {
        "id": 3,
        "name": "Maasai Mara Wildlife Conservancies Association",
        "counties": ["Narok"]
    },
    {
        "id": 4,
        "name": "Northern Rangelands Trust",
        "counties": ["Isiolo"]
    },
    {
        "id": 5,
        "name": "South Rift Association of Land Owners",
        "counties": ["Narok"]
    },
    {
        "id": 6,
        "name": "Tsavo Conservation Area",
        "counties": ["Taita Taveta"]
    }
]