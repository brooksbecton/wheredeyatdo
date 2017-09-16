import { Blaze } from "meteor/blaze";
import { Template } from "meteor/templating";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container)
    );
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    const centerLogin = styled.div`
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    `;

    const LoginStyles = styled.div`
      min-height: 250px;
      padding: 10px;
    `;
    // Just render a placeholder container that will be filled in
    return (
      <LoginStyles>
        <centerLogin ref="container" />;
      </LoginStyles>
    );
  }
}
