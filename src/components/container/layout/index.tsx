import React, { FC, ReactNode } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContainer } from '../structure';
import { AppBar } from '../structure';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
);
interface FromProps {
    children: ReactNode,
    sesionState: boolean
}

export const Layout: FC<FromProps> = ({ children, sesionState }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar sesionState={sesionState} />  
            <AppContainer>
                {
                    children
                }
            </AppContainer>
            
        </div>
    )
}