import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';

export default function UserForm (props) {
    const [fname, setFirstName] = React.useState();
    const [lname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [bdate, setBirthDate] = React.useState();
    const [password, setPassword] = React.useState('');
    const [cpassword, setConfirmPassword] = React.useState('');
    // const [id, setId] = React.useState('');

    React.useEffect(() => {
        const curUser = localStorage.getItem('user');
        if(curUser != null){
            setFirstName(curUser.fname);
            setLastName(curUser.lname);
            setEmail(curUser.email);
            setPhone(curUser.phone);
            setBirthDate(curUser.dob);
        }
    }, [])

    const submitForm = () => {
        props.submitForm({
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            dob: bdate.format(),
            password: password,
        });
    }

    const handleUpdate = () => {
        props.handleUpdate({
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            dob: bdate.format(),
        })
    }

    return (
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
                />
                </Grid>
                <Grid item xs={12} sm={6} style={{paddingTop: '17px'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{minWidth: '180px'}}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                            
                            label="Date of Birth"
                            value={bdate}
                            onChange={(newValue) => setBirthDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                
                {props.isRegister === true ? (
                    <React.Fragment>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(event) => {setPassword(event.target.value)}}
                                fullWidth
                                autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="cpassword"
                                name="cpassword"
                                label="Confirm Password"
                                type="password"
                                value={cpassword}
                                onChange={(event) => {setConfirmPassword(event.target.value)}}
                                fullWidth
                            />
                        </Grid>
                    </React.Fragment>
                    
                ) : ''}
                
            </Grid>
            {props.isRegister === true ? (
                <Button
                type="submit"
                fullWidth
                onClick={submitForm}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            ) : (
                <Button
                type="submit"
                onClick={handleUpdate}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Update
                </Button>
            )}
            
        </React.Fragment>
    )
}