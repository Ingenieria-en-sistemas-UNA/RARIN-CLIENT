import React, { FC } from 'react';
import Card from '../components/items/card'
import { Grid } from '@material-ui/core';

const cards = [1, 2, 3, 4]


const HomePage: FC = () => {
  localStorage.setItem('route', '/home');
  return (
    <Grid container justify='space-around' direction='row' wrap='wrap' style={{ display: 'flex', alignItems: 'flex-start' }}>
      {
        cards.map((value: number, index: number) => <Card key={index} />)
      }
    </Grid>
  );
}

export default HomePage;