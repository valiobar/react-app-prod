import React from 'react';
import HomePage from '../../components/HomePage'
import RegisterUserPage from '../../components/UserComponents/RegisterUserPage'
import LoginUserPage from '../../components/UserComponents/LoginUserPage'
import UserLogOut from '../../components/UserComponents/UserLogOut'
import AdminPanel from '../../components/AdminComponents/AdminPanel'
import { Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
// code skipped for brevity



const Routes = () => (
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/home' component={HomePage} />
        <Route path='/user/register' component={RegisterUserPage} />
        <Route path='/user/login' component={LoginUserPage} />
        <PrivateRoute path='/user/logout' component={UserLogOut} />
        <PrivateRoute path='/admin/panel' component={AdminPanel} />
    {/*
        <Redirect from='/about-us' to='/about' />
        <Route component={NotFoundPage} /> */}
    </Switch>
)

export default Routes