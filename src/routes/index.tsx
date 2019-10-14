import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from '../components/container/layout';
import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import PrivateRoute from './routes_auth/PrivateRoute';
import Dashboard from '../pages/Dashboard';
import { History } from 'history';

interface FromProps {
    sesionState: boolean,
    history: History
}

export const AppRoutes: FC<FromProps> = ({ sesionState, history }) =>
    <Layout sesionState={sesionState} history={history}>
        <Switch>
            <PrivateRoute exact path="/" state={sesionState} component={HomePage} />
            <PrivateRoute exact path="/dashboard" state={sesionState} component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Redirect to='/'/>
        </Switch>
    </Layout>