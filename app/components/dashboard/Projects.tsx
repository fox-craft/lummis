import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useContext} from "react";
import {FilterContext} from "@/app/components/filter/FilterContext";
import dayjs from "dayjs";
import {useProjectsQuery} from "@/app/components/helpers/api";

// Generate Order Data
function createData(
    id: number,
    date: string,
    name: string,
    shipTo: string,
    paymentMethod: string,
    amount: number,
) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function Projects() {
    const {landscape} = useContext(FilterContext)
    const {data} = useProjectsQuery(landscape)

    const recent_projects = () =>  {
        const now = dayjs()
        if (data) {
            return data.filter((p: any) => (dayjs(p.start_date, "MM/DD/YYYY")) > now.subtract(6, 'month'));
        }
    }
    return (
        <React.Fragment>
            <Title>Recent Projects</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Start Date</TableCell>
                        <TableCell>Project Name</TableCell>
                        <TableCell>County</TableCell>
                        <TableCell>Beneficiary</TableCell>
                        <TableCell align="right">Est. Pop</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.slice(0, 10).map((row : any) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.start_date}</TableCell>
                            <TableCell>{row.project_name}</TableCell>
                            <TableCell>{row.county}</TableCell>
                            <TableCell>{row.beneficiary_category}</TableCell>
                            <TableCell align="right">{`${row.estimated_beneficiaries}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more projects
            </Link>
        </React.Fragment>
    );
}