import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Reminders () {

    const [reminders, setReminders] = React.useState([]);

    React.useEffect(() => {
        getReminderData();
    }, [])

    const getReminderData = () => {
        // axios.get(process.env.REACT_APP_API_BASE_URL+'get-reminders').then((response) => {
        //     setReminders(response.data);
        // }).catch((error) => {
        //     alert('An error occured!');
        //     console.log(error);
        // })
    }

    return (
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Dosage</TableCell>
                            <TableCell>Frequency</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            {reminders.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.dosage}</TableCell>
                                <TableCell>{row.frequency}</TableCell>
                                <TableCell>{row.sdate}</TableCell>
                                <TableCell>{row.edate}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                </TableContainer>
    );
}