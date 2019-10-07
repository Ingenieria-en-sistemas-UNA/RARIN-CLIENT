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
    children: ReactNode
}

export const Layout: FC<FromProps> = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar />  
            <AppContainer>
                {
                    children
                }
            </AppContainer>
            
        </div>
    )
}