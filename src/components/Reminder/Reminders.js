// Group Details
// Name: Niyati Gaikwad StudentID: 8849554
// Name: Parthkumar Malaviya StudentID: 8869965
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
        axios.get(process.env.REACT_APP_API_BASE_URL+'medicinereminder/reminders/getRemindersByUserId', {params: {userId: JSON.parse(localStorage.getItem("user")).userId}}).then((response) => {
            setReminders(response.data.reminderData);
        }).catch((error) => {
            alert('An error occured!');
            console.log(error);
        })
    }

    return (
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>Caretaker Contact</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            {reminders.map((row) => (
                                <TableRow
                                key={row.reminderId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.time}
                                </TableCell>
                                <TableCell>{row.cartakerphone}</TableCell>
                                <TableCell>{row.message}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                </TableContainer>
    );
}