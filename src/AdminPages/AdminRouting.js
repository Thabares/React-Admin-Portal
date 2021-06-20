import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Pages/dashboard/Dashboard';
import Users from './Pages/users/Users';

export default function AdminRouting() {
  return (
    <Switch>
      <Route
        exact
        path="/admin"
        render={() => <Redirect to="/admin/dashboard" />}
      />
      <Route exact path="/admin/dashboard" component={Dashboard} />
      <Route exact path="/admin/users" component={Users} />
    </Switch>
  );
}
