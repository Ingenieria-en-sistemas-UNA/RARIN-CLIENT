import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: FC<any> = ({ component: Component, state, ...rest }) => (
    <Route {...rest} render={(props) => (
        state
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)



    // return <Route {...rest} render={(props) => <StreamBuilder
    //         stream={authBloc.sesionStateStream()}
    //         builder={(snapshot: Snapshot<Boolean>) => {
    //                 const state: Boolean | undefined = snapshot.data;
    //                 if (state != undefined) {
    //                     return state
    //                         ? <Component {...props} />
    //                         : <Redirect to='/login' />
    //                 }
    //                 return <Redirect to='/login' />
    //             }
    //         } />
    //     }
    // />


export default PrivateRoute;