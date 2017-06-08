import React, { Component } from "react";
import PropTypes from "prop-types";

function FakeComponent() {}

class ClassComponentToTest extends Component {
  state = {
    clicked: false
  };

  handleClick = event => {
    event.preventDefault();

    this.setState({ clicked: true });
  };

  render() {
    const { props, state, context } = this;
    return !context.contextualValue
      ? <FakeComponent
          fixedProp={"some-value"}
          onClick={this.handleClick}
          clicked={state.clicked}
          {...props}
        >
          {props.children}
        </FakeComponent>
      : <FakeComponent context />;
  }
}

ClassComponentToTest.contextTypes = {
  contextualValue: PropTypes.string
};

export default ClassComponentToTest;
