import React, { FC, useContext } from 'react';
import { AppRoutes } from './routes/index';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { BlocsContext } from './store/Context';

const history = createBrowserHistory();

const App: FC = () =>{
  
  const { authBloc } = useContext(BlocsContext);
  authBloc.load();
  return <Router history={history}>
    <AppRoutes />
  </Router>
}
  


export default App;
