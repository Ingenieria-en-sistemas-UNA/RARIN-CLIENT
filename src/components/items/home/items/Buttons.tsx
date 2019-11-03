import React, { FC } from 'react'
import { useTheme, Zoom, Fab, Theme, makeStyles } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import WidgetsIcon from '@material-ui/icons/Widgets';
import CategoryDialog from '../../category/index';
import ProductDialog from '../../product/index';

const useStyles = makeStyles((theme: Theme) => ({
    fabExtras: {
        position: 'fixed',
        right: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const Animation: FC<any> = ({ children, delay = 1 }) => {
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    return (
        <Zoom
            key={'extras'}
            in
            timeout={transitionDuration}
            style={{
                transitionDelay: `${transitionDuration.exit + delay}ms`,
            }}
            unmountOnExit
        >
            {
                children
            }
        </Zoom>
    )
}

export const Buttons: FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [openCategory, setOpenCategory] = React.useState(false);
    const [openProduct, setOpenProduct] = React.useState(false);

    const handleClickOpenProduct = () => {
        setOpenProduct(true);
    };

    const handleCloseProduct = () => {
        setOpenProduct(false);
    };
    const handleClickOpenCategory = () => {
        setOpenCategory(true);
    };

    const handleCloseCategory = () => {
        setOpenCategory(false);
    };
    return (
        <>
            <Animation delay={25}>
                <Fab
                    variant="extended"
                    aria-label="Categoría"
                    className={classes.fabExtras}
                    style={{ bottom: theme.spacing(20) }}
                    onClick={handleClickOpenCategory}
                >
                    <CategoryIcon className={classes.extendedIcon} />
                    Categoría
                </Fab>
            </Animation>
            <Animation>
                <Fab
                    variant="extended"
                    aria-label="delete"
                    className={classes.fabExtras}
                    style={{ bottom: theme.spacing(12) }}
                    onClick={handleClickOpenProduct}
                >
                    <WidgetsIcon className={classes.extendedIcon} />
                    Producto
            </Fab>
            </Animation>
            <CategoryDialog open={openCategory} handleClose={handleCloseCategory} />
            <ProductDialog open={openProduct} handleClose={handleCloseProduct} />
        </>
    )
}