import React, { FC } from 'react';
import Card from '../components/items/card'

const cards = [1]


const HomePage: FC = () => {
  
  return (
    <div>
      {
        cards.map((value: number, index: number) => <Card key={index} />)
      }
    </div>
  );
}

export default HomePage;