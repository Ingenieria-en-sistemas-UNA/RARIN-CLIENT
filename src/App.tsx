import React, { FC, useContext, useEffect } from 'react';
import { AppRoutes } from './routes/index';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { BlocsContext } from './store/Context';
import { StreamBuilder, Snapshot } from './utils/BlocBuilder/index';
import { VariantType, useSnackbar } from 'notistack';
import { Error } from './Models/Errors';

const history = createBrowserHistory();

const App: FC = (props: any) => {

  const { authBloc, categoryBloc, productBloc } = useContext(BlocsContext);
  const { enqueueSnackbar } = useSnackbar();

  const addSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const ErrorObserver = (cleanErrors: () => void) => (errors: Error[]) => {
    if (errors.length > 0) {
      errors.forEach((error) => addSnackbar(error.message, 'error'))
      cleanErrors();
    }
  }

  useEffect(() => {
    authBloc.load();
    categoryBloc.load();

    authBloc.errorsStrem().subscribe(ErrorObserver(authBloc.cleanErrors));
    categoryBloc.errorsStrem().subscribe(ErrorObserver(categoryBloc.cleanErrors));
    productBloc.errorsStrem().subscribe(ErrorObserver(productBloc.cleanErrors));
  }, []);
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
