import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card as CardMaterial, Fab } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Product } from '../../../Models/Product';
import imageDefault from '../../../assets/image/default.png'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { green, red } from '@material-ui/core/colors';
import { BlocsContext } from '../../../store/Context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 190,
      margin: '20px 20px 0px 0px'
    },
    media: {
      height: 120,
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
  }));

interface FromProps {
  product: Product;
}


const Card = ({ product }: FromProps) => {
  const classes = useStyles();
  const [image, setImage] = useState()
  const [added, setAdded] = useState(true);
  const { shoppingCarBloc } = useContext(BlocsContext);

  const fabAdd: any =
  {
    color: 'inherit',
    className: classes.fabGreen,
    icon: <AddIcon />,
    label: 'Add',
  };
  const fabRemove: any =
  {
    color: 'inherit',
    className: classes.fabRed,
    icon: <RemoveIcon />,
    label: 'Remove',
  };

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
  // eslint-disable-next-line
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
        <Fab
          size='small'
          aria-label={fabRemove.label}
          className={fabRemove.className}
          color={fabRemove.color}
          disabled={shoppingCarBloc.searchProduct(product) === -1}
          onClick={() => {
            shoppingCarBloc.removeItem(product)
            setAdded(!added)
          }}
        >
          {fabRemove.icon}
        </Fab>
        <Fab
          size='small'
          aria-label={fabAdd.label}
          className={fabAdd.className}
          color={fabAdd.color}
          onClick={() => {
            shoppingCarBloc.addItem(product)
            setAdded(!added)
          }}
        >
          {fabAdd.icon}
        </Fab>
      </CardActions>
    </CardMaterial>

  );
}
export default Card;