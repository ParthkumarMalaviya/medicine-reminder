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
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Users() {
    const [fname, setFirstName] = React.useState('');
    const [lname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [bdate, setBirthDate] = React.useState();
    const [password, setPassword] = React.useState('');
    const [cpassword, setConfirmPassword] = React.useState('');
    const [userData, setUserData] = React.useState([]);
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('1');

    React.useEffect(() => {
        getUserData();
    }, [])

    const handleClickOpen = () => {
        // getUserById();
        setOpen(true);
    };

    const getUserById = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL+'get-user/'+id).then((response) => {
            setFirstName(response.data.fname);
            setLastName(response.data.lname);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setBirthDate(response.data.dob);
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const getUserData = () => {
        // axios.get(process.env.REACT_APP_API_BASE_URL+'get-users').then((response) => {
        //     setUserData(response.data);
        // }).catch((error) => {
        //     alert('An error occured!');
        //     console.log(error);
        // })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const submitForm = () => {

        let obj = {
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            password : password,
            dob:  bdate.format()
        }
        // const formData = new FormData()
        // formData.append('fname', fname)
        // formData.append('lname', lname)
        // formData.append('email', email)
        // formData.append('phone', phone)
        // formData.append('password', password)
        // formData.append('dob', bdate.format())

        axios.post(process.env.REACT_APP_API_BASE_URL+'medicinereminder/userdetails/registerUser', obj).then((response) => {
            setFirstName(''); setLastName(''); setEmail(''); setPassword(''); setConfirmPassword(''); setPhone(''); setBirthDate(dayjs());
            setValue(1);
        }).catch((error) => {
            alert('An error occured!');
            console.log(error);
        })
    };

    const userForm = (
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                label="Date of Birth"
                                value={bdate}
                                onChange={(newValue) => setBirthDate(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    
                </Grid>
                
                </React.Fragment>
            </Box>
    )

    const handleUpdate = () => {
        const formData = new FormData()
        formData.append('fname', fname)
        formData.append('lname', lname)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('dob', bdate.format())

        axios.put(process.env.REACT_APP_API_BASE_URL+'update-user/'+id, formData).then((response) => {
            handleClose();
            alert('Updated successfully!');
        }).catch((error) => {
            alert('An error occured!')
        })
    } 

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    <Tab label="User List" value="1" />
                    <Tab label="Registration" value="2" />
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
                    {"Edit Profile"}
                    </DialogTitle>
                    <DialogContent>
                    {userForm}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={() => {setId(id); handleClickOpen()}}>Edit Profile</Button>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Date of Birth</TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            {userData.map((row) => (
                                <TableRow
                                key={row.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.dob}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                    </TableContainer>
                </TabPanel>



                <TabPanel value="2">
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h5" variant="h5" align="center">
                            Registration
                        </Typography>
                        
                        {userForm}
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    value={password}
                                    onChange={(event) => {setPassword(event.target.value)}}
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="cpassword"
                                    name="cpassword"
                                    label="Confirm Password"
                                    value={cpassword}
                                    onChange={(event) => {setConfirmPassword(event.target.value)}}
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        
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