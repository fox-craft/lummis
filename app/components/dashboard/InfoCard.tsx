import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

interface InfoCardProps {
    key: string,
    title: string,

}

export const InfoCard: React.FC<InfoCardProps> = ({key, title}) => {
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Typography component="p" variant="h4">
                3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                as of 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View more
                </Link>
            </div>
        </React.Fragment>
    );
}