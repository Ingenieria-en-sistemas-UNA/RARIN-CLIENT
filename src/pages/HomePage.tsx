import React, { FC, useContext, useEffect } from 'react';
import Card from '../components/items/card'
import { Paper, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BlocsContext } from '../store/Context';
import { StreamBuilder, Snapshot } from '../utils/BlocBuilder/index';
import { Product } from '../Models/Product';
import { CarButton } from '../components/items/home/CarButton';
import { AdminButton } from '../components/items/home/AdminButton';
import CategoryFilter from '../components/items/filters/CategoryFilter';
import { SearchInput } from '../components/items/home/SearchInput';

const useStyles = makeStyles(theme => ({
  root: {
    top: theme.spacing(10),
    padding: theme.spacing(2),
    backgroundColor: '#536DFE',
    width: '100%',
    height: 70,
    margin: '0px 20px 0px 20px'
  },
  progress: {
    margin: theme.spacing(10),
  },
}));

const HomePage: FC = () => {
  localStorage.setItem('route', '/');
  const { authBloc, productBloc, categoryBloc } = useContext(BlocsContext);
  const classes = useStyles();
  useEffect(() => {
    categoryBloc.load();
    productBloc.load();
  })
  return (
    <Grid container spacing={3}>
      <Paper className={classes.root}>
        <Grid container justify='flex-end' direction='row' wrap='wrap'>
          <CategoryFilter />
          <SearchInput />
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
            return products.length > 0 ? (
              products.map((product: Product, index: number) => <Card key={index} product={product} />)
            ) : (
                <p>No hay productos</p>
              )
          }}
        />
      </Grid>
      {
        authBloc.isAdmin() ? (
          <AdminButton />
        ) : (
            <CarButton />
          )

      }
    </Grid>
  );
}

export default HomePage;