import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from '../General/Login';
import Admin from '../AdminPages/Admin';
import AdminAuth from '../AdminAuth';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />
        <AdminAuth path={['/admin']} component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
