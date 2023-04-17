import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function CareGivers() {

    const [fname, setFirstName] = React.useState('');
    const [lname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [value, setValue] = React.useState('1');
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');

    const handleClickOpen = () => {
        // getCaregiverById();
        setOpen(true);
    };

    const getCaregiverById = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL+'get-caregiver/'+id).then((response) => {
            setFirstName(response.data.fname);
            setLastName(response.data.lname);
            setEmail(response.data.email);
            setPhone(response.data.phone);
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        // axios.get(process.env.REACT_APP_API_BASE_URL+'get-caregivers').then((response) => {
        //     setData(response.data);
        // }).catch((error) => {
        //     alert('An error occured!');
        //     console.log(error);
        // })

        setData([{
            fname: 'test',
            lname: 'one',
            email: 'a@b.com',
            phone: '3487893793',
        }])
    }

    const handleUpdate = () => {
        const formData = new FormData()
        formData.append('fname', fname)
        formData.append('lname', lname)
        formData.append('email', email)
        formData.append('phone', phone)

        axios.put(process.env.REACT_APP_API_BASE_URL+'update-caregiver/'+id, formData).then((response) => {
            handleClose();
            alert('Updated successfully!');
        }).catch((error) => {
            alert('An error occured!')
        })
    }

    const submitForm = () => {

        let obj = {
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            
        }
        // const formData = new FormData()
        // formData.append('fname', fname)
        // formData.append('lname', lname)
        // formData.append('email', email)
        // formData.append('phone', phone)

        axios.post(process.env.REACT_APP_API_BASE_URL+'save-caregiver-info', obj).then((response) => {
            setFirstName(''); setLastName(''); setEmail(''); setPhone('');
            setValue(1);
        }).catch((error) => {
            alert('An error occured!');
            console.log(error);
        })
    };

    const handleDelete = (id) => {
        // console.log('this is id', id);
        if (window.confirm("Are you sure you want to delete?") == true) {
            axios.delete(process.env.REACT_APP_API_BASE_URL+'delete-caregiver', id).then((response) => {
                alert('Deleted successfully!');
            }).catch((error) => {
                alert('An error occured while deleting!');
            })
        }
    }

    const caregiverForm = (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        value={fname}
                        onChange={(event) => {setFirstName(event.target.value)}}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        value={lname}
                        onChange={(event) => {setLastName(event.target.value)}}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        value={email}
                        onChange={(event) => {setEmail(event.target.value)}}
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={phone}
                        onChange={(event) => {setPhone(event.target.value)}}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                    </Grid>
                    
                </Grid>
                
                </React.Fragment>
            </Box>
    )

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    <Tab label="Caregiver List" value="1" />
                    <Tab label="Add Caregiver" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Edit Medication Details"}
                    </DialogTitle>
                    <DialogContent>
                    {caregiverForm}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button>
                    </DialogActions>
                </Dialog>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>
                                <IconButton onClick={() => {setId(row.id); handleClickOpen();}} color="primary" aria-label="upload picture" component="label">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => {handleDelete(row.id)}} color="primary" aria-label="" component="label">
                                    <DeleteIcon />
                                </IconButton>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                    </TableContainer>
                </TabPanel>



                <TabPanel value="2">
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h6" variant="h4" align="center">
                            Add Caregiver
                        </Typography>
                        
                        {caregiverForm}
                        <Grid xs={12} sm={12} item alignItems="center" justifyContent="center">
                            <Button
                            variant="contained"
                            onClick={submitForm}
                            sx={{ mt: 3, ml: 1 }}
                            >
                            Submit
                            </Button>
                        </Grid>
                        </Paper>
                    </Container>
                </TabPanel>
            </TabContext>
        </Box>
    );
}