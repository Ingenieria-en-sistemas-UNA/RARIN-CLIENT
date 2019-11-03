import React, { FC, useContext, useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Fab } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { BlocsContext } from '../../../store/Context';
import { Product } from '../../../Models/Product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
    fabRed: {
      color: theme.palette.common.white,
      marginRight: 10,
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[600],
      },
    },
  }));

interface FromProps {
  product: Product;
}

export const ClientCarButtons: FC<FromProps> = ({ product }) => {
    const classes = useStyles();
    const { shoppingCarBloc } = useContext(BlocsContext);



    const [added, setAdded] = useState(true);

    useEffect(() => {
      shoppingCarBloc.shoppingCartStream().subscribe((shopingCar) => setAdded(!added))
    }, []);

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

    return (
        <>
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
        </>
    )
}