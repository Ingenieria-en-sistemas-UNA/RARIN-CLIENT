import React, { FC, useContext, useEffect } from 'react';
import { AppRoutes } from './routes/index';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { BlocsContext } from './store/Context';
import { StreamBuilder, Snapshot } from './utils/BlocBuilder/index';
import { VariantType, useSnackbar } from 'notistack';

const history = createBrowserHistory();

const App: FC = (props: any) => {

  const { authBloc } = useContext(BlocsContext);
  const { enqueueSnackbar } = useSnackbar();

  const addSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };
  
  authBloc.load();
  useEffect(() => {
    authBloc.errorsStrem().subscribe(
      errors => {
        if(errors.length > 0){
            errors.forEach((error) => addSnackbar(error.message, 'error'))
            authBloc.cleanErrors();
        }
      });
  });
  //  const { sesionStateStream }: AuthBloc = this.context;

  return <StreamBuilder
    stream={authBloc.sesionStateStream()}
    builder={(snapshot: Snapshot<boolean>) => {
      let state: boolean | undefined = snapshot.data;
      if (state === undefined) {
        state = false;
      }
      return (
        <Router history={history}>
          <AppRoutes sesionState={state} history={history} />
        </Router>
      )
    }}
  />

}



export default App;
