import React from 'react';
import { Route, withRouter } from 'react-router-dom';
function AdminAuth(props) {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}

export default withRouter(AdminAuth);
