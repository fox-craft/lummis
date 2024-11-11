import React from "react";
import {Menu, MenuItem} from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Link from "next/link";


const ProSidebar = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [collapsed, setCollapsed] = React.useState(false);
    return (
        <Menu>
            <MenuItem icon={<HomeOutlinedIcon/>} component={<Link href="/" />}>
                Home
            </MenuItem>
            {/*<SubMenu icon={<CalendarTodayOutlinedIcon/>} label='Projects'>*/}
            {/*    <MenuItem icon={<GridViewRounded/>} component={<Link href="/projects" />}>List</MenuItem>*/}
            {/*    <MenuItem icon={<MapRounded/>} component={<Link href="/projects/map" />}>Map</MenuItem>*/}
            {/*</SubMenu>*/}
            <MenuItem icon={<QueryBuilderIcon/>}>Filters</MenuItem>
            <MenuItem icon={<QueryStatsIcon/>}>Analyse</MenuItem>
            <MenuItem icon={<EditIcon/>}>Edit</MenuItem>

        </Menu>
    );
};

export default ProSidebar;