import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import AccountsUIWrapper from "./../User/AccountsUIWrapper";

class LoginModal extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.props.toggleLoginModal()}
      />
    ];
    return (
      <Dialog
        actions={actions}
        modal={true}
        open={this.props.open}
        onRequestClose={() => this.props.toggleLoginModal()}
        title="Sign In/Out"
      >
        <AccountsUIWrapper />
      </Dialog>
    );
  }
}

export default LoginModal;
