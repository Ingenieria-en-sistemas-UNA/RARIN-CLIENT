import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card as CardMaterial, Collapse } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from '../../../Models/Product';
import imageDefault from '../../../assets/image/default.png'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 190,
      margin: '20px 20px 0px 0px'
    },
    media: {
      height: 120,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

interface FromProps {
  product: Product;
}


const Card = ({ product }: FromProps) => {
  const classes = useStyles();
  const [image, setImage] = useState()

  const loadImage = async () => {
    try {
      if (product.imageUrl as string) {
        const photo = await fetch(`${product.imageUrl}`).then(response => response.blob());
        setImage(photo)
      }
    } catch (error) {
      const photo = await fetch(imageDefault).then(response => response.blob())
      setImage(photo)
    }
  }
  useEffect(() => {
    loadImage()
  }, [])

  return (
    <CardMaterial className={classes.card}>
      <CardActionArea>
        <CardMedia
          component='img'
          className={classes.media}
          image={image ? URL.createObjectURL(image) : require('../../../assets/image/default.png')}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {
              product.name
            }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Precio: ${ product.price }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Comprar
        </Button>
      </CardActions>
    </CardMaterial>

  );
}
export default Card;