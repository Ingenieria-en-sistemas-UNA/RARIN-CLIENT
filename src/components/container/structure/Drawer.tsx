import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, Drawer as DrawerMaterial, IconButton, Divider, List, ListItem, ListItemIcon } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { secondaryListItems } from '../../dashboard/listItems';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemText from '@material-ui/core/ListItemText';
import { History } from 'history';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'fixed',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}));

interface FromProps {
    open: boolean,
    handleDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    history: History
}



export const Drawer: FC<FromProps> = ({ open, handleDrawer, history }) => {
    const classes = useStyles();
    const onGoDashboar = () => {
        history.push('/dashboard')
    }

    const onGoProfile = () =>{
        history.push('/profile')
    }
    
    const onGoOrders = () => {
        history.push('/orders')
    }
    const onGoReports =()=>{
        history.push('/reports')
    }
    return (
        <DrawerMaterial
            variant="permanent"
            
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => handleDrawer(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <div>
                    <ListItem button onClick={onGoDashboar}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={onGoOrders}>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItem>
                    <ListItem button onClick={onGoReports}>
                        <ListItemIcon>
                        <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItem>
                    <ListItem button onClick={onGoProfile}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mi Perfil" />
                    </ListItem>
                 
                    <ListItem button>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Integrations" />
                    </ListItem>
                </div>
            </List>
            <Divider />
            <List>{secondaryListItems}</List>
        </DrawerMaterial>
    )
}
