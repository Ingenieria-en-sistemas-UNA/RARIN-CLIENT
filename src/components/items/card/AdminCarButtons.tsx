import React, { FC, useContext, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Fab } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import { BlocsContext } from '../../../store/Context';
import { Product } from '../../../Models/Product';
import ProductDialog from '../product/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabGrey: {
      color: theme.palette.common.white,
      backgroundColor: grey[500],
      '&:hover': {
        backgroundColor: grey[600],
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

export const AdminCarButtons: FC<FromProps> = ({ product }) => {
    const classes = useStyles();
    const { productBloc } = useContext(BlocsContext);

    const [open, setOpen] = useState(false);
    const fabAdd: any =
    {
        color: 'inherit',
        className: classes.fabGrey,
        icon: <EditIcon />,
        label: 'Edit',
    };
    const fabRemove: any =
    {
        color: 'inherit',
        className: classes.fabRed,
        icon: <DeleteForeverIcon />,
        label: 'Delete',
    };

    return (
        <>
            <Fab
                size='small'
                aria-label={fabRemove.label}
                className={fabRemove.className}
                color={fabRemove.color}
                onClick={() => {
                    productBloc.remove(product.id as number)
                }}
            >
                {fabRemove.icon}
            </Fab>
            <Fab
                size='small'
                aria-label={fabAdd.label}
                className={fabAdd.className}
                color={fabAdd.color}
                onClick={() => setOpen(true)}
            >
                {fabAdd.icon}
            </Fab>
            <ProductDialog open={open} handleClose={setOpen} product={product} />
        </>
    )
}