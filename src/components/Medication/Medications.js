// Group Details
// Name: Niyati Gaikwad StudentID: 8849554
// Name: Parthkumar Malaviya StudentID: 8869965
import * as React from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Medications() {
    const [name, setName] = React.useState('');
    const [dosage, setDosage] = React.useState('');
    const [frequency, setFrequency] = React.useState(1);
    const [sdate, setStartDate] = React.useState(dayjs());
    const [edate, setEndDate] = React.useState(dayjs());
    const [time, setTime] =  React.useState();
    const [value, setValue] = React.useState('1');
    const [medicationData, setMedicationData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');
    const [medicineId, setMedicineId] = React.useState('');

    const handleClickOpen = (id) => {
        setMedicineId(id);
        getMedicationById(id);
        setOpen(true);
    };

    const getMedicationById = (id) => {
        const editableObj = medicationData.filter(obj => obj.medicineId === id)[0]
        setName(editableObj.name);
        setDosage(editableObj.dosage);
        setFrequency(editableObj.frequency);
        setStartDate(dayjs(editableObj.start_date));
        setEndDate(dayjs(editableObj.end_date));
        setTime(dayjs(editableObj.time_to_take));
    }

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setId(JSON.parse(localStorage.getItem('user')).userId);
        getMedicationData();
    }, [])

    const getMedicationData = () => {
        console.log(localStorage.getItem("user"));
        axios.get(process.env.REACT_APP_API_BASE_URL+'medicinereminder/medicines/getMedicinesByUserId', {params: {userId: JSON.parse(localStorage.getItem("user")).userId}}).then((response) => {
            setMedicationData(response.data.medicinesData);
        }).catch((error) => {
            alert('An error occured!');
            console.log(error);
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUpdate = () => {

        let obj = {
            name: name,
            dosage: dosage,
            frequency: frequency,
            start_date: sdate.format(),
            end_date : edate.format(),
            time_to_take: time.format(),
            medicineId: medicineId
        }

        axios.put(process.env.REACT_APP_API_BASE_URL+'medicinereminder/medicines/updateMedicine', obj).then((response) => {
            let temp = medicationData.filter(obj => obj.medicineId != response.data.updatedMedicineData.medicineId);
            temp.push(response.data.updatedMedicineData);
            setMedicationData(temp);
            handleClose();
            alert('Updated successfully!');
        }).catch((error) => {
            alert('An error occured!')
        })
    }

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Medication Report";
        const headers = [["Name", "Dosage", "Frequency", "Start Date", "End Date", "Time"]];
    
        const data = medicationData.map(obj=> [obj.name, obj.dosage, obj.frequency == 1 ? 'Once a day' : (obj.frequency == 2 ? 'Twice a day' : 'As needed'), dayjs(obj.start_date).format('DD/MM/YYYY'), dayjs(obj.end_date).format('DD/MM/YYYY'), dayjs(obj.time_to_take).format('hh:mm')]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Report.pdf")
    }

    const submitForm = () => {

        let obj = {
            name: name,
            dosage: dosage,
            frequency: frequency,
            start_date: sdate.format("YYYY-MM-DD"),
            end_date : edate.format("YYYY-MM-DD"),
            time_to_take: time.format("hh:mm"),
            userId: id
        }

        axios.post(process.env.REACT_APP_API_BASE_URL+'medicinereminder/medicines/addMedicine', obj).then((response) => {
            medicationData.push(obj);
            setName(''); setDosage(''); setFrequency(1); setStartDate(dayjs()); setEndDate(dayjs());
            setValue("1");
        }).catch((error) => {
            alert('An error occured!');
            console.log(error);
        })
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?") == true) {
            axios.delete(process.env.REACT_APP_API_BASE_URL+'medicinereminder/medicines/deleteMedicine', {params: {medicineId: id}}).then((response) => {
                setMedicationData(medicationData.filter(obj => obj.medicineId != id))
                alert('Deleted successfully!');
            }).catch((error) => {
                alert('An error occured while deleting!');
            })
        }
    }

    const medicationForm = (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    value={name}
                    fullWidth
                    onChange={(event) => {setName(event.target.value)}}
                    autoComplete="given-name"
                    variant="standard"
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="dosage"
                    name="dosage"
                    label="Dosage"
                    value={dosage}
                    fullWidth
                    onChange={(event) => {setDosage(event.target.value)}}
                    autoComplete="family-name"
                    variant="standard"
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
                        <Select
                            labelId="frequency"
                            id="frequency"
                            value={frequency}
                            label="Frequency"
                            onChange={(event) => {setFrequency(event.target.value)}}
                            >
                            <MenuItem value={1}>Once a day</MenuItem>
                            <MenuItem value={2}>Twice a day</MenuItem>
                            <MenuItem value={3}>As needed</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                            label="Start Date"
                            value={sdate}
                            onChange={(newValue) => setStartDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                            label="End Date"
                            value={edate}
                            onChange={(newValue) => setEndDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                        <TimePicker
                        label="Time to take"
                        value={time}
                        ampm={false}
                        onChange={(newValue) => setTime(newValue)}
                        />
                    </DemoContainer>
                    </LocalizationProvider>
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
                    <Tab label="Medication List" value="1" />
                    <Tab label="Add Medication" value="2" />
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
                    {medicationForm}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button>
                    </DialogActions>
                </Dialog>

                {medicationData.length ? <Button onClick={() => exportPDF()}>Generate Report</Button> : ''}
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Dosage</TableCell>
                            <TableCell>Frequency</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Time to take</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            {medicationData.map((row) => (
                                <TableRow
                                key={row.medicineId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.dosage}</TableCell>
                                    <TableCell>{row.frequency == 1 ? 'Once a day' : (row.frequency == 2 ? 'Twice a day' : 'As needed') }</TableCell>
                                    <TableCell>{dayjs(row.start_date).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{dayjs(row.end_date).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{row.time_to_take}</TableCell>
                                    <TableCell>
                                    <IconButton onClick={() => {handleClickOpen(row.medicineId);}} color="primary" aria-label="upload picture" component="label">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => {handleDelete(row.medicineId)}} color="primary" aria-label="" component="label">
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
                        <Typography component="h5" variant="h5" align="center">
                            Add Medication
                        </Typography>
                        
                        {medicationForm}
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