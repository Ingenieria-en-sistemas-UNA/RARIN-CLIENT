import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Layout } from '../components/container/layout';
import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import PrivateRoute from './routes_auth/PrivateRoute';

interface FromProps {
    sesionState: boolean
}

export const AppRoutes: FC<FromProps> = ({ sesionState }) =>
    <Layout sesionState={sesionState}>
        <Switch>
            <PrivateRoute exact path="/" state={sesionState} component={HomePage} />
            <Route exact path="/login" component={Login} />
        </Switch>
    </Layout>