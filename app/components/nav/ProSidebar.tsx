import React, {useContext} from "react";
import {Menu, MenuItem} from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditIcon from '@mui/icons-material/Edit';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Link from "next/link";
import Button from "@mui/material/Button";
import {MapContext} from "@/app/components/filter/MapContext";


const ProSidebar = () => {
    const {filterOpen, setFilterOpen} = useContext(MapContext);
    return (
        <Menu>
            <MenuItem icon={<HomeOutlinedIcon/>} component={<Link href="/" />}>
                Home
            </MenuItem>
            <MenuItem icon={<QueryBuilderIcon/>} component={<Button onClick={_ => setFilterOpen(!filterOpen)}/>}>Filters</MenuItem>
            <MenuItem icon={<QueryStatsIcon/>}>Analyse</MenuItem>
            <MenuItem icon={<EditIcon/>}>Edit</MenuItem>

        </Menu>
    );
};

export default ProSidebar;