import React from "react";
import {Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {DashboardOutlined, GridViewRounded, MapRounded} from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
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
            <MenuItem icon={<MapIcon/>} component={<Link href="/map" />}>Map</MenuItem>
            <MenuItem icon={<ContactsOutlinedIcon/>}>Contacts</MenuItem>
            <MenuItem icon={<ReceiptOutlinedIcon/>}>Profile</MenuItem>

        </Menu>
    );
};

export default ProSidebar;