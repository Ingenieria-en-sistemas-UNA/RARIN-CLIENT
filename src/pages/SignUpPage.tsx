import React, { FC, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSnackbar } from 'notistack';
import { History } from 'history';
import { validateLogin } from '../utils/validators/LoginValidator';
import { BlocsContext } from '../store/Context';
import { StreamBuilder, Snapshot } from '../utils/BlocBuilder/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Client } from '../Models/Client';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        RARIN TECHNOLOGIES
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%', // Fix IE 11 issue.
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
const SignUpPage: FC<FromProps> = ({ history }) => {
  const classes = useStyles();
  const { authBloc } = useContext(BlocsContext);
  const { enqueueSnackbar } = useSnackbar();
  if (authBloc.isLoggedin()) {
    history.push(localStorage.getItem('route') || '/')
  }
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sinErrors = { email, password, name, lastName, id };
    const result = validateLogin(sinErrors);
    if (!Object.keys(result).length) {
      try {
        const client: Client = { person: { name, lastName, id: Number(id) } };
        const isLogged = await authBloc.signup(client, email, password);
        if (isLogged) {
          enqueueSnackbar('Se ha registrado exitosamente', { variant: 'success' })
        }
        setTimeout(() => history.push('/'), 1000)
      } catch ({ message }) {
        enqueueSnackbar('Algo ocurrio al intentar registrarse', { variant: 'error' })
      }
    } else {
      setErrors(result);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <StreamBuilder
          stream={authBloc.loadingStrem()}
          builder={(snapshot: Snapshot<boolean>) => {
            let state: boolean | undefined = snapshot.data;
            if (!state) {
              return (
                <form className={classes.form} onSubmit={e => onSubmit(e)} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        helperText={errors.name ? errors.name : ""}
                        label="First Name"
                        autoFocus
                        error={errors.name ? true : false}
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        helperText={errors.LastName ? errors.LastName : ""}
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        autoFocus
                        error={errors.lastName ? true : false}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="id"
                        helperText={errors.id ? errors.id : ""}
                        label="Identification"
                        name="id"
                        autoComplete="id"
                        autoFocus
                        error={errors.id ? true : false}
                        value={id}
                        onChange={e => setId(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        helperText={errors.email ? errors.email : ""}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={errors.email ? true : false}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={errors.password ? true : false}
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="center">
                    <Grid item>
                      <Button onClick={()=>history.push("/login")}>
                       Ya tienes una cuenta? Inicia sesion aquí
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
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default SignUpPage;