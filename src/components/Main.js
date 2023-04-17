import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MedicationIcon from '@mui/icons-material/Medication';
import Medications from './Medications';
import CareGivers from './CareGivers';
import Users from './Users';
import Reminders from './Reminders';

const drawerWidth = 240;

const primaryComponents = [
    {
        id: 1,
        comp: <Medications/>,
        label: 'Medications',
        icon: <VaccinesIcon/>,
        // comp: <Medications/>
    },
    {
        id: 2,
        comp: <CareGivers/>,
        label: 'Caregivers',
        icon: <MedicationIcon/>
    }
];
const secondaryComponents = [
    {
        id: 1,
        comp: <Users/>,
        label: 'All User',
        icon: <GroupIcon/>
    },
    {
        id: 2,
        comp: <Reminders/>,
        label: 'Reminders',
        icon: <NotificationsIcon/>
    }
];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export default function MainComponent() {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedComponent, setSelectedComponent] = React.useState(<Medications/>);

    const handleListItemClick = (componentName) => {
        console.log(componentName);
        setSelectedComponent(componentName);
    };

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Medicine Reminder
            </Typography>
            {auth && (
                <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                Username
                
                <IconButton color="inherit" aria-label="upload picture" component="label">
                    <LogoutIcon />
                </IconButton>
                </div>
            )}
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {primaryComponents.map((comp, index) => (
                <ListItem key={comp.id} disablePadding onClick={()=> {handleListItemClick(comp.comp)}}>
                <ListItemButton>
                    <ListItemIcon>
                    {comp.icon}
                    </ListItemIcon>
                    <ListItemText primary={comp.label} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {secondaryComponents.map((comp, index) => (
                <ListItem key={comp.id} disablePadding onClick={()=> {handleListItemClick(comp.comp)}}>
                <ListItemButton>
                    <ListItemIcon>
                    {comp.icon}
                    </ListItemIcon>
                    <ListItemText primary={comp.label} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
        <Main open={open}>
            {/* <DrawerHeader /> */}
            <Box sx={{ mt: 5 }}>
                {selectedComponent}
            </Box>
        </Main>
    </Box>
    );
}