function FakeComponent() {}

import React from "react"

export default function FunctionalComponentToTest(props) {
  return (
    <FakeComponent
      fixedProp={ "some-value" }
      { ...props }
    />
  )
}
