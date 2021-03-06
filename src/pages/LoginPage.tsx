import React, { FC, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { History } from 'history';
import { validateLogin } from '../utils/validators/LoginValidator';
import { BlocsContext } from '../store/Context';
import { StreamBuilder, Snapshot } from '../utils/BlocBuilder/index';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progress: {
        margin: theme.spacing(10),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface FromProps {
    history: History
}
const LoginPage: FC<FromProps> = ({ history }) => {
    const classes = useStyles();
    const { authBloc } = useContext(BlocsContext);
    const { enqueueSnackbar } = useSnackbar();
    if (authBloc.isLoggedin()) {
        history.push(localStorage.getItem('route') || '/')
    }
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [password, setPassword] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sinErrors = { email, password };
        const result = validateLogin(sinErrors);
        if (!Object.keys(result).length) {
            try {
                const isLogged = await authBloc.login(email, password);
                if (isLogged) {
                    enqueueSnackbar('Se ha logeado exitosamente', { variant: 'success' })
                }
                setTimeout(() => history.push('/'), 1000)
            } catch ({ message }) {
                enqueueSnackbar('Algo ocurrio al intentar logear', { variant: 'error' })
            }
        } else {
            setErrors(result);
        }
    }
    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <StreamBuilder
                stream={authBloc.loadingStrem()}
                builder={(snapshot: Snapshot<boolean>) => {
                    let state: boolean | undefined = snapshot.data;
                    if (!state) {
                        return (
                            <form className={classes.form} onSubmit={e => onSubmit(e)} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    helperText={errors.email ? errors.email : ""}
                                    name="email"
                                    type="text"
                                    error={errors.email ? true : false}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error={errors.password ? true : false}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                            </Button>
                                <Grid container justify="center">
                                    <Grid item>
                                        <Button onClick={() => history.push("/signup")}>
                                            ¿No tienes una cuenta? Registrate aquí
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>
                        )

                    } else {
                        return <CircularProgress variant="indeterminate" className={classes.progress} />
                    }
                }}
            />
        </div>
    );
}

export default LoginPage;