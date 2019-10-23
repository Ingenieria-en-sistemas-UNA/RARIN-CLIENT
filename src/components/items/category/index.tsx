import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        wrapper: {
            margin: theme.spacing(2),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

export default function CategoryDialog({ open, handleClose }: any) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    useEffect(() => {
        return () => {
            clearTimeout(2000);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    const handleButtonClose = () => {
        setSuccess(false);
        setLoading(false);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleButtonClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Crear Categoría</DialogTitle>
            <DialogContent style={{ height: 150 }}>
                <DialogContentText>
                    Crea un tipo de producto para poder filtrar y organizar mejor los productos de la tienda, tratá de ser bastante puntual.
                </DialogContentText>
                <Grid container direction='row' spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Nombre'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            margin='dense'
                            id='description'
                            label='Descripción'
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleButtonClose} color='primary'>
                    Cancel
                </Button>
                <div className={classes.wrapper}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        className={buttonClassname}
                        onClick={handleButtonClick}
                    >
                        {success ? <CheckIcon /> : <SaveIcon />}
                    </Fab>
                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </div>
            </DialogActions>
        </Dialog>
    );
}
