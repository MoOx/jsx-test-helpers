import React from "react";

import { noop, renderJSX, JSX } from "../index.js";

// Two important things I want to highlight here
//
// 1. You don't need the real component that will be rendered. A empty function
// is totally fine as it won't be rendered.
// Eg: You are testing and ActionButton that will render a Button. No need
// to import the Button. You can just use a empty function with the same name
// (React consider function as functional components)
//
// 2. It's important to use a real function here, and not an arrow function
// This is to ensure that function is named, so React will use the name as
// the component name for the shallow rendering (and so the actual rendering)
import FunctionalComponentToTest from "./__fixtures__/fn.js";
import ClassComponentToTest from "./__fixtures__/class.js";

function FakeComponent() {}

test("Can render & test a functional component", () => {
  expect(renderJSX(<FunctionalComponentToTest bool />)).toMatch(
    JSX(<FakeComponent fixedProp={"some-value"} bool />)
  );
});

// Note that the order of the props you expect and the one that are rendered
// does not matter, since the JSX method handle the order,
// thanks to react-element-to-jsx-string
test("Can render & test a class component", () => {
  expect(renderJSX(<ClassComponentToTest bool />)).toMatch(
    JSX(
      <FakeComponent
        onClick={noop}
        clicked={false}
        bool
        fixedProp={"some-value"}
      />
    )
  );
});

// I think it's interesting here to have to mock an event.
// This way your tests will explicitely contain what event properties you
// are using.
test("Can render & test a class component with a state and an event", () => {
  expect(
    renderJSX(<ClassComponentToTest bool />, render =>
      render.props.onClick({ preventDefault: noop })
    )
  ).toMatch(
    JSX(<FakeComponent fixedProp={"some-value"} onClick={noop} clicked bool />)
  );
});

test("Can render & test a class handler on a child", () => {
  let clicked = false;
  const click = () => (clicked = true);

  const child = <div onClick={click}>{"ClickMe"}</div>;
  expect(
    renderJSX(
      <ClassComponentToTest>
        {child}
      </ClassComponentToTest>,
      render => {
        render.props.children.props.onClick();
      }
    )
  ).toMatch(
    JSX(
      <FakeComponent fixedProp={"some-value"} onClick={noop} clicked={false}>
        {child}
      </FakeComponent>
    )
  );
  expect(clicked).toBe(true);
});

// Context example
test("Can render & test a class component with a context", () => {
  expect(
    renderJSX(<ClassComponentToTest bool />, {
      contextualValue: "yes"
    })
  ).toMatch(JSX(<FakeComponent context />));
});
