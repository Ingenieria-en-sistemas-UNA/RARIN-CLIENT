import React, { FC, useState, useContext, useEffect } from 'react';
import Card from '../components/items/card'
import { useTheme, Paper, Grid, Fab, Zoom, CircularProgress } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import WidgetsIcon from '@material-ui/icons/Widgets';
import CategoryIcon from '@material-ui/icons/Category';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { BlocsContext } from '../store/Context';
import CategoryDialog from '../components/items/category/index';
import ProductDialog from '../components/items/product/index';
import CategoryFilter from '../components/items/filters/CategoryFilter'
import { StreamBuilder, Snapshot } from '../utils/BlocBuilder/index';
import { Product } from '../Models/Product';

const useStyles = makeStyles(theme => ({
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
  fabExtras: {
    position: 'fixed',
    right: theme.spacing(2),
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
  extendedIcon: {
    marginRight: theme.spacing(1),
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
    maxHeight: 40,
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
  progress: {
    margin: theme.spacing(10),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const Animation: FC<any> = ({ children, delay = 1 }) => {
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  return (
    <Zoom
      key={'extras'}
      in
      timeout={transitionDuration}
      style={{
        transitionDelay: `${transitionDuration.exit + delay}ms`,
      }}
      unmountOnExit
    >
      {
        children
      }
    </Zoom>
  )
}


const Buttons: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false);

  const handleClickOpenProduct = () => {
    setOpenProduct(true);
  };

  const handleCloseProduct = () => {
    setOpenProduct(false);
  };
  const handleClickOpenCategory = () => {
    setOpenCategory(true);
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };
  return (
    <>
      <Animation delay={25}>
        <Fab
          variant="extended"
          aria-label="Categoría"
          className={classes.fabExtras}
          style={{ bottom: theme.spacing(20) }}
          onClick={handleClickOpenCategory}
        >
          <CategoryIcon className={classes.extendedIcon} />
          Categoría
        </Fab>
      </Animation>
      <Animation>
        <Fab
          variant="extended"
          aria-label="delete"
          className={classes.fabExtras}
          style={{ bottom: theme.spacing(12) }}
          onClick={handleClickOpenProduct}
        >
          <WidgetsIcon className={classes.extendedIcon} />
          Producto
          </Fab>
      </Animation>
      <CategoryDialog open={openCategory} handleClose={handleCloseCategory} />
      <ProductDialog open={openProduct} handleClose={handleCloseProduct} />
    </>
  )
}

const HomePage: FC = () => {
  localStorage.setItem('route', '/home');
  const { authBloc, productBloc } = useContext(BlocsContext);
  productBloc.load();
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
    <Grid container spacing={3}>
      <Paper className={classes.root}>
        <Grid container justify='flex-end' direction='row' wrap='wrap'>
          <CategoryFilter />
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
        </Grid>
      </Paper>
      <Grid container justify='space-around' direction='row' wrap='wrap' style={{ display: 'flex', alignItems: 'flex-start', padding: 20 }}>
        <StreamBuilder
          stream={productBloc.productStrem()}
          builder={(snapshot: Snapshot<Product[]>) => {
            let products: Product[] = snapshot.data || []
            if (!snapshot.hasData) {
              return <CircularProgress variant="indeterminate" className={classes.progress} />
            }
            return products.map((product: Product, index: number) => <Card key={index} product={product} />)
          }}
        />
      </Grid>
      {
        authBloc.isAdmin() && (
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
    </Grid>
  );
}

export default HomePage;