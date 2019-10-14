import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: FC<any> = ({ component: Component, state, ...rest }) => (
    <Route {...rest} render={(props) => {
        const routeProps = { ...props, sesionState: state };
        return state
            ? <Component {...routeProps} />
            : <Redirect to='/login' />
    }
} />
)

export default PrivateRoute;