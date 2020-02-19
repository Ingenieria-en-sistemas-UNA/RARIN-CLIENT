import React, { useState, FC, useContext, useEffect } from 'react'
import { useTheme, Zoom, Fab, Theme, makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ShoppingCarDialog } from '../shoppingCar/index';
import { orange } from '@material-ui/core/colors';
import { BlocsContext } from '../../../store/Context';
import { StreamBuilder, Snapshot } from '../../../utils/BlocBuilder/index';
import { ShoppingCar } from '../../../Models/ShoppingCar';

const useStyles = makeStyles((theme: Theme) => ({
    fabOrange: {
        color: theme.palette.common.white,
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[600],
        },
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

export const CarButton: FC = () => {

    const classes = useStyles();
    const theme = useTheme();
    const { shoppingCarBloc } = useContext(BlocsContext);
    const [added, setAdded] = useState(true);
    useEffect(() => {
        shoppingCarBloc.shoppingCartStream().subscribe((shopingCar) => setAdded(!added))
    }, []);
    const [openShoppingCard, setOpenShoppingCard] = useState(false);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    return (
        <>
            <Zoom
                key='123123123'
                in
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${transitionDuration.exit}ms`,
                }}
                unmountOnExit
            >
                <StreamBuilder
                    stream={shoppingCarBloc.shoppingCartStream()}
                    builder={(snapshot: Snapshot<ShoppingCar>) => {
                        const { items } = snapshot.data as ShoppingCar || { items: [] };
                        return (
                            <Fab
                                aria-label='ShoppingCar'
                                className={classes.fabOrange}
                                color='inherit'
                                disabled={items.length === 0}
                                onClick={() => setOpenShoppingCard(true)}
                            >
                                {<ShoppingCartIcon />}
                            </Fab>
                        )
                    }}
                />
            </Zoom>
            <ShoppingCarDialog open={openShoppingCard} setOpen={setOpenShoppingCard} />
        </>
    )
}