import React, { FC, useContext } from 'react';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar as AppBarMaterial } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { History } from 'history';
import clsx from 'clsx';


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
    // menuButton: {
    //   marginRight: theme.spacing(2),
    //   width: 'auto',
    // },
    title: {
      flexGrow: 1,
      display: 'none',
      color: theme.palette.secondary.main,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  }),
);


interface FromProps {
  sesionState: boolean,
  history: History,
  open: boolean,
  handleDrawer: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AppBar: FC<FromProps> = ({ sesionState, open: openDrawer, handleDrawer, history }) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () =>{
        
  };
  
  return (
    <AppBarMaterial position="fixed" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
      <Toolbar>
        {
          sesionState && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => handleDrawer(true)}
              className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
          )
        }
        <Typography className={classes.title} variant="h6" noWrap onClick={() => history.push('/')}>
          RARIN TECHNOLOGIES
        </Typography>
        {
          sesionState ? (
            <>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Buscar…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </>
          ) : <Button color="inherit">Login</Button>

        }
      </Toolbar>
    </AppBarMaterial>
  );
}
