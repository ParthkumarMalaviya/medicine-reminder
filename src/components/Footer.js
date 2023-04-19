import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';

export default function Footer () {
    return (
        <Paper sx={{marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        width: '100%'
        }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
            <Box
            sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                my:1
            }}
            >
                {/* <div>
                <Image priority src="/Logo.svg" width={75} height={30} alt="Logo" />
                </div> */}
            </Box>

            <Box
            sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                mb: 2,
            }}
            >
            <Typography variant="caption" color="initial">
                Copyright ©{dayjs().format('YYYY')}. []
            </Typography>
            </Box>
        </Container>
        </Paper>
    )
}