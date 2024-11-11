import {Inter} from "next/font/google";
import "./globals.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {FilterProvider} from "@/app/components/filter/FilterContext";
import LeftDrawer from "@/app/components/nav/LeftDrawer";
import {Metadata} from "next";
import ThemeRegistry from "@/app/components/ThemeRegistry/ThemeRegistry";
import CssBaseline from "@mui/material/CssBaseline";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "KWCA-LUMMIS",
    description: "Land Use Management & Monitoring Information System (KWCA)",
};

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://foxcraftafrica.com/">
                FoxCraft Africa
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth: number = 240;

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body suppressHydrationWarning={true}>
        <ThemeRegistry>
            <CssBaseline />
            <FilterProvider>
                <Box sx={{display: 'flex'}}>
                    <LeftDrawer/>
                    <Box
                        component="main"
                        sx={{
                            bgcolor: "background.default",
                            // ml: `${DRAWER_WIDTH}px`,
                            mt: ["48px", "56px", "64px"],
                            p: 0,
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'hidden',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </FilterProvider>
        </ThemeRegistry>
        </body>
        </html>
    );
}
