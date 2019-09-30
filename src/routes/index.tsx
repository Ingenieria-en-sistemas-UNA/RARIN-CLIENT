import React, { FC, useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from '../components/container/layout';
import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import PrivateRoute from './routes_auth/PrivateRoute';
import { Snapshot, StreamBuilder } from '../utils/BlocBuilder';
import { BlocsContext } from '../store/Context';


export const AppRoutes: FC = () => {
    const { authBloc } = useContext(BlocsContext);
    return <Layout>
        <Switch>
            <StreamBuilder
                stream={authBloc.sesionStateStream()}
                builder={(snapshot: Snapshot<Boolean>) => {
                    const state: Boolean | undefined = snapshot.data;
                    return (
                        <>
                            <PrivateRoute exact path="/" state={state} component={HomePage} />
                            <Route exact path="/login" component={Login} />
                            <Redirect to="/login" />
                        </>
                    )
                }}
            />
        </Switch>
    </Layout>
}