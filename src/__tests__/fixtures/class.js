function FakeComponent() {}

import React, { Component } from "react"

export default class ClassComponentToTest extends Component {
  state = {
    clicked: false,
  };

  handleClick = (event) => {
    event.preventDefault()

    this.setState({ clicked: true })
  };

  render() {
    const { props, state } = this
    return (
      <FakeComponent
        fixedProp={ "some-value" }
        onClick={ this.handleClick }
        clicked={ state.clicked }
        { ...props }
      >
        { props.children }
      </FakeComponent>
    )
  }
}
