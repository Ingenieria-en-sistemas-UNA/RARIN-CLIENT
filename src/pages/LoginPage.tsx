import React, { FC, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { History } from 'history';
import { validateLogin } from '../utils/validators/LoginValidator';
import { BlocsContext } from '../store/Context';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');

    const { authBloc } = useContext(BlocsContext);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sinErrors = { email, password };
        const result = validateLogin(sinErrors);
        if (!Object.keys(result).length) {
            try {
                await authBloc.login(email, password);
                history.push('/')
            } catch ({ message }) {
                setErrors({ general: message });
            }
        } else {
            setErrors(result)
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
            <form className={classes.form} onSubmit={e => onSubmit(e)} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                    autoComplete="current-password"
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
            </form>
        </div>
    );
}

export default LoginPage;