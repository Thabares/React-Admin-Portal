import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

export default function AdminRouting() {
  return (
    <Switch>
      <Route
        exact
        path="/admin"
        render={() => <Redirect to="/admin/dashboard" />}
      />
      <Route exact path="/admin/dashboard" component={Dashboard} />
    </Switch>
  );
}
