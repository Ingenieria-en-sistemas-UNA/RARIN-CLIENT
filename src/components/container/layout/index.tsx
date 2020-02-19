import React, { FC, ReactNode, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppContainer } from '../structure';
import { AppBar } from '../structure';
import { Drawer } from '../structure';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { History } from 'history';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
);
interface FromProps {
  children: ReactNode,
  sesionState: boolean,
  history: History
}

export const Layout: FC<FromProps> = ({ children, sesionState, history }) => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(localStorage.getItem('drawer') === 'true' || false);
  localStorage.setItem('drawer', drawer ? 'true' : 'false')
  if (!sesionState && drawer) {
    setDrawer(false);
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        sesionState={sesionState}
        history={history}
        open={drawer}
        handleDrawer={setDrawer}
      />
      <Grid container>
        {
          sesionState && (
            <Grid item xs={drawer ? 2 : 1}>
              <Drawer open={drawer} handleDrawer={setDrawer} history={history} />
            </Grid>
          )
        }
        <Grid item xs={drawer ? 10 : sesionState ? 11 : 12}>
          <AppContainer>
            {
              children
            }
          </AppContainer>
        </Grid>

      </Grid>

    </div>
  )
}