import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { BlocsContext } from '../../../store/Context';
import { StreamBuilder, Snapshot } from '../../../utils/BlocBuilder/index';
import { ShoppingCar } from '../../../Models/ShoppingCar';
import { ItemCar } from '../../../Models/ItemCar';
import { ClientCarButtons } from '../card/ClientCarButtons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      color: 'white',
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ShoppingCarDialog = ({ open, setOpen }: any) => {
  const classes = useStyles();
  const { shoppingCarBloc } = useContext(BlocsContext);

  const [added, setAdded] = useState(true);
  useEffect(() => {
    shoppingCarBloc.shoppingCartStream().subscribe((shopingCar) => setAdded(!added))
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Carrito de Compras
            </Typography>
          <Button autoFocus color="inherit" onClick={handleClose} style={{ color: 'white' }}>
            Comprar
            </Button>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <List style={{ flex: 0.9, height: '100vh' }}>
          <StreamBuilder
            stream={shoppingCarBloc.shoppingCartStream()}
            builder={(snapshot: Snapshot<ShoppingCar>) => {
              const shoppingCar = snapshot.data;
              let items: ItemCar[] = [];
              if (shoppingCar) {
                items = shoppingCar.items;
              }
              return items.map((item, index) => {
                return (
                  <div key={`${index}-shopping`}>
                    <ListItem>
                      <ListItemText primary={item.product.name} secondary={`Precio: $${item.product.price}    cantidad: ${item.cant}`} />
                      <ClientCarButtons product={item.product} />
                    </ListItem>
                    <Divider />
                  </div>
                )
              })
            }}
          />
        </List>
        <div style={{ flex: 0.1 }}>
          <Divider />
          <StreamBuilder
            stream={shoppingCarBloc.shoppingCartStream()}
            builder={(snapshot: Snapshot<ShoppingCar>) => {
              const shoppingCar = snapshot.data;
              let items: ItemCar[] = [];
              if (shoppingCar) {
                items = shoppingCar.items;
              }
              let total = 0;
              items.forEach(({ product: { price }, cant }) => total += price * cant);
              return (
                <Typography key='shoppingCard-Total' variant='subtitle1' style={{ padding: 20 }}>
                  Total: ${total}
                </Typography>
              )
            }}
          />

        </div>
      </div>
    </Dialog>
  );
}
