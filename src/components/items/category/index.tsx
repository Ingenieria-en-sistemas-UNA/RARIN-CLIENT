import React, { useState, useContext } from 'react';
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
import ErrorIcon from '@material-ui/icons/Error';
import clsx from 'clsx';
import { BlocsContext } from '../../../store/Context';
import { Category } from '../../../Models/Category';
import { CategoryValidator } from '../../../utils/validators/CategoryValidator';
import { useSnackbar } from 'notistack';

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
    const { categoryBloc } = useContext(BlocsContext);
    const { enqueueSnackbar } = useSnackbar();

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const handleButtonClose = () => {
        setSuccess(false);
        setLoading(false);
        setDescription('');
        setName('');
        setErrors({ noCreated: false });
        handleClose();
    }

    const handleButtonClick = async () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            const sinErrors = { name, description };
            const result = CategoryValidator(sinErrors);
            if (!Object.keys(result).length) {
                try {
                    const category: Category = { description, name }
                    const created = await categoryBloc.add(category);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                    if (created) {
                        enqueueSnackbar('Se ha creado una categoría', { variant: 'success' })
                        setSuccess(true);
                        setTimeout(() => {
                            handleButtonClose()
                        }, 500);
                    } else {
                        setErrors({ noCreated: true });
                        setTimeout(() => {
                            setErrors({ noCreated: false });
                        }, 2000);
                    }
                } catch ({ message }) {
                    enqueueSnackbar('Algo ocurrio al intentar crear la categoría', { variant: 'error' })
                }
            } else {
                setErrors(result);
            }
        }
    };

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
                            value={ name }
                            onChange={ e => setName(e.target.value)}
                            error={ errors.name ? true : false }
                            helperText={errors.name ? errors.name : ''}
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
                            value={ description }
                            onChange={ e => setDescription(e.target.value)}
                            helperText={errors.description ? errors.description : ''}
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
                        disabled={ success || errors.noCreated }
                    >
                        { !errors.noCreated ? success ? <CheckIcon /> : <SaveIcon /> : <ErrorIcon />}
                    </Fab>
                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </div>
            </DialogActions>
        </Dialog>
    );
}
