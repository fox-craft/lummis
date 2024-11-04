import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {ListItem} from "@mui/material";
import Link from "next/link";

const LINKS = [
    {text: 'Dashboard', href: '/', icon: DashboardIcon},
    {text: 'Register', href: '/register', icon: GroupsIcon},
    {text: 'Factories', href: '/factories', icon: StarIcon},
    {text: 'Maps', href: '/map', icon: MapIcon},
    {
        text: 'Data Collection',
        href: '/datacollection',
        icon: ContentPasteIcon,
        "children": [
            {text: 'Responses', href: '/datacollection', icon: ContentPasteIcon},
            {text: 'Map', href: '/datacollection/map', icon: ContentPasteIcon},
        ]

    },
];

const PLACEHOLDER_LINKS = [
    {text: 'Settings', icon: SettingsIcon},
    {text: 'Support', icon: SupportIcon},
    {text: 'Logout', icon: LogoutIcon},
];
export const mainListItems = (
    <React.Fragment>
        {LINKS.map(({text, href, icon: Icon}) => (
            <ListItem key={href} disablePadding>
                <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                        <Icon/>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItemButton>
            </ListItem>
        ))}
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Year-end sale"/>
        </ListItemButton>
    </React.Fragment>
);

export const placeHolderItems = (
    <React.Fragment>
        {PLACEHOLDER_LINKS.map(({text, icon: Icon}) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Icon/>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItemButton>
            </ListItem>
        ))}
    </React.Fragment>
);