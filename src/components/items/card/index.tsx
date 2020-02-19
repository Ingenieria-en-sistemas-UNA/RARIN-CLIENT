import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card as CardMaterial } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Product } from '../../../Models/Product';
import imageDefault from '../../../assets/image/default.png'
import { BlocsContext } from '../../../store/Context';
import { AdminCarButtons } from './AdminCarButtons';
import { ClientCarButtons } from './ClientCarButtons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 190,
      margin: '20px 20px 0px 0px'
    },
    media: {
      height: 120,
    },
  }));

interface FromProps {
  product: Product;
}


const Card = ({ product }: FromProps) => {
  const classes = useStyles();
  const { authBloc, productBloc } = useContext(BlocsContext);


  const [image, setImage] = useState<Blob | boolean>(false)

  const loadImage = async () => {
    try {
      if (product.imageUrl) {
        const photo = await fetch(`${product.imageUrl}`).then(response => response.blob());
        setImage(photo)
      }
    } catch (error) {
      const photo = await fetch(imageDefault).then(response => response.blob())
      setImage(photo)
    }
  }
  // eslint-disable-next-line
  useEffect(() => {
      loadImage()
  }, [productBloc.products])

  return (
    <CardMaterial className={classes.card}>
      <CardActionArea>
        <CardMedia
          component='img'
          className={classes.media}
          image={image ? URL.createObjectURL(image) : require('../../../assets/image/default.png')}
          title="Contemplative Reptile"
        />
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {
              product.name
            }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Precio: ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: 'flex', justifyContent: 'space-around' }}>
        {
          authBloc.isAdmin() ? (
            <AdminCarButtons product={product} />
          ) : (
              <ClientCarButtons product={product} />
            )
        }

      </CardActions>
    </CardMaterial>

  );
}
export default Card;