import React, { FC, useContext } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar as AppBarMaterial } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { History } from 'history';
import clsx from 'clsx';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { BlocsContext } from '../../../store/Context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: 240,
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      color: theme.palette.secondary.main,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    logout: {
      color: 'white',
      '&:hover': {
        color: theme.palette.secondary.main
      },
      marginLeft: 20
    },
  }),
);


interface FromProps {
  sesionState: boolean,
  history: History,
  open: boolean,
  handleDrawer: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AppBar: FC<FromProps> = ({ sesionState, open, handleDrawer, history }) => {
  const classes = useStyles();
  const { authBloc } = useContext(BlocsContext);
  const handleClose = () => {
    authBloc.logout();
    history.push('/login')
  };
  return (
    <AppBarMaterial position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar>

        {
          sesionState && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => handleDrawer(true)}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
          )
        }
        <Typography className={classes.title} variant="h6" noWrap onClick={() => history.push('/')}>
          RARIN TECHNOLOGIES
        </Typography>
        {
          sesionState && (
            <div>
              {
                sesionState && (
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleClose}
                    className={classes.logout}
                  >
                    <PowerSettingsNewIcon />
                  </IconButton>
                )
              }

            </div>
          )

        }
      </Toolbar>
    </AppBarMaterial>
  );
}
