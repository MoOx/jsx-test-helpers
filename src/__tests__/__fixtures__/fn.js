import React from "react";

function FakeComponent() {}

export default function FunctionalComponentToTest(props) {
  return <FakeComponent fixedProp={"some-value"} {...props} />;
}
