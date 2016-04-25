function FakeComponent() {}

import React, { Component, PropTypes } from "react"

class ClassComponentToTest extends Component {
  state = {
    clicked: false,
  };

  handleClick = (event) => {
    event.preventDefault()

    this.setState({ clicked: true })
  };

  render() {
    const { props, state, context } = this
    return (
      !context.contextualValue
      ? (
        <FakeComponent
          fixedProp={ "some-value" }
          onClick={ this.handleClick }
          clicked={ state.clicked }
          { ...props }
        >
          { props.children }
        </FakeComponent>
      )
      : <FakeComponent context />
    )
  }
}

ClassComponentToTest.contextTypes = {
  contextualValue: PropTypes.string,
}

export default ClassComponentToTest
