import React, { Component } from 'react';
import { AppRoutes } from './routes/index';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { BlocsContext } from './store/Context';
import { StreamBuilder, Snapshot } from './utils/BlocBuilder/index';

const history = createBrowserHistory();

class App extends Component<any, any> {
  static contextType = BlocsContext;

  async componentWillMount() {
    const { authBloc } = this.context;
    authBloc.load();
  }

  render() {
    const { authBloc } = this.context;

    return <StreamBuilder
      stream={authBloc.sesionStateStream()}
      builder={(snapshot: Snapshot<boolean>) => {
        let state: boolean | undefined = snapshot.data;
        if(state === undefined){
          state = false;
        }
        return <Router history={history}>
          <AppRoutes sesionState={state} history={history}/>
        </Router>
      }}
    />
  }

}



export default App;
