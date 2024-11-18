import * as React from "react";
import {useContext, useState} from "react";
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import {Grid, MenuItem} from "@mui/material";
import {MapContext} from "@/app/components/filter/MapContext";


export default function CountySelector() {
    const {county, setCounty} = useContext(MapContext);
    const handleValueChange = (event: SelectChangeEvent) => {
        setCounty(event.target.value as string);
    };

    return (
        <Grid sx={{flexGrow: 1}}>
            <FormControl size="small" variant='standard' sx={{flexGrow: 1, m: 1, minWidth: 120}}>
                <InputLabel>Select County</InputLabel>
                <Select
                    autoWidth
                    label="County"
                    value={county}
                    onChange={handleValueChange}
                    variant='standard'
                    size='medium'
                    id='_selected_landscape'
                >
                    <MenuItem value=""><em>All</em></MenuItem>
                    {counties.map(county => (
                        <MenuItem key={county} value={county}>{county}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

const counties = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta", "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans-Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
]