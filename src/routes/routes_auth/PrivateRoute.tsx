import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: FC<any> = ({ component: Component, state, ...rest }) => (
    <Route {...rest} render={(props) => (
        state
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

export default PrivateRoute;