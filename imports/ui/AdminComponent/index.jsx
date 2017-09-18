import React from "react";

import { isBusAccount } from "./../../app/auth";

function AdminComponent(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      {
        isBusAccount() && <WrappedComponent {...this.props} />;
      }
    }
  };
}
export default AdminComponent;
