import Auth from './Auth'
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        Auth.isUserAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: 'user/login',
                state: { from: props.location }
            }} />
        )
    )
    } />
)


export default PrivateRoute