import React, { FC, ReactNode } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

interface FromProps {
    children: ReactNode
}

export const AppContainer: FC<FromProps> = ({ children }) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                {
                    children
                }
            </Container>
        </main>
    );
}