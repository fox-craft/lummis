import * as React from "react";
import {useContext, useState} from "react";
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import {Grid, MenuItem} from "@mui/material";
import {FilterContext} from "@/app/components/filter/FilterContext";

export default function SelectCounty() {
    const {countyName, setCountyName, countyId, startDate, endDate} = useContext(FilterContext);
    const [selectedCounty, setSelectedCounty] = useState<string>('')

    const handleCountyChange = (event: SelectChangeEvent<string>) => {
        setCountyName(event.target.value as string);
    };


    return (
        <Grid sx={{flexGrow: 1}}>
            <FormControl size="small" variant='standard' sx={{flexGrow: 1, m: 1, minWidth: 120}}>
                <InputLabel>Select County</InputLabel>
                <Select
                    autoWidth
                    label="County"
                    value={countyName}
                    onChange={handleCountyChange}
                    variant='standard'
                    size='small'
                    id='_selected_county'
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Nakuru">Nakuru</MenuItem>
                    <MenuItem value="Meru">Meru</MenuItem>
                    <MenuItem value="Embu">EMbu</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}