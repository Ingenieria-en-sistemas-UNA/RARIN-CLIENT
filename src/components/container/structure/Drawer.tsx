import React, { FC, useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, Drawer as DrawerMaterial, IconButton, Divider, List, ListItem, ListItemIcon } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { secondaryListItems } from '../../dashboard/listItems';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { History } from 'history';
import { BlocsContext } from '../../../store/Context';


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
    const { authBloc } = useContext(BlocsContext);
    const [route, setRoute] = useState(localStorage.getItem('route') || '/');
    const onGoHome = () => {
        setRoute('/');
    }
    const onGoDashboar = () => {
        history.push(route)
        setRoute('/dashboard');
    }
    const onGoOrders = () => {
        setRoute('/orders');
    }
    const onGoReports = () => {
        setRoute('/reports');
    }
    useEffect(() => {
        history.push(route);
    }, [route]);
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
                    <ListItem button onClick={onGoHome} selected={route === '/'}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                    <ListItem button onClick={onGoDashboar} selected={route === '/dashboard'}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={onGoOrders} selected={route === '/orders'}>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItem>
                    {
                        authBloc.isAdmin() && (
                            <ListItem button onClick={onGoReports} selected={route === '/reports'}>
                                <ListItemIcon>
                                    <BarChartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Reports" />
                            </ListItem>
                        )
                    }
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mi Perfil" />
                    </ListItem>
                </div>
            </List>
        </DrawerMaterial>
    )
}
