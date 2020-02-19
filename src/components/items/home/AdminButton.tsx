import React, { useState, FC } from 'react'
import clsx from 'clsx';
import { useTheme, Zoom, Fab, Theme, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { Buttons } from './items/Buttons'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        top: theme.spacing(10),
        padding: theme.spacing(2),
        backgroundColor: '#536DFE',
        width: '100%',
        height: 70,
        margin: '0px 20px 0px 20px'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
    fabRed: {
        color: theme.palette.common.white,
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[600],
        },
    },
}));

export const AdminButton: FC = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [add, addState] = useState(true);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const fab: any =
    {
        color: 'inherit',
        className: clsx(classes.fab, add ? classes.fabGreen : classes.fabRed),
        icon: <AddIcon />,
        label: 'Add',
    };
    return (
        <>
            <Zoom
                key={fab.color}
                in
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${transitionDuration.exit}ms`,
                }}
                unmountOnExit
            >

                <Fab
                    aria-label={fab.label}
                    className={fab.className}
                    color={fab.color}
                    onClick={() => setTimeout(() => addState(!add), 200)}
                >
                    {add ? fab.icon : <ClearIcon />}
                </Fab>
            </Zoom>
            {
                !add && (
                    <Buttons />
                )
            }
        </>
    )
}