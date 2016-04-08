//
// Important note about how to place the renderJSX and JSX calls:
//
// Power Assert will help you for test failures in order to show you what is in
// each variable or function calls
//
// Until power-assert handle JSX correctly, we must use variables instead
// of using JSX directly in the t.deepEqual assertion
//
//      https://github.com/power-assert-js/power-assert/issues/34
//
// Currently here is what you will get with a failures
//
/* eslint-disable max-len */
//
// ✔ Can render & test a functional component
// ✖ Can render & test a class component
// t.same(actual, expected)
//        |       |
//        |       "<FakeComponent\n  bool={true}\n  fixedProp=\"some-value\"\n  onClick={function noRefCheck() {}}\n/>"
//        "<FakeComponent\n  bool={true}\n  clicked={false}\n  fixedProp=\"some-value\"\n  onClick={function noRefCheck() {}}\n/>"
//
//
// 1 test failed
//
// 1. Can render & test a class component
// AssertionError: '<FakeComponent\n  bool={true}\n  clicked={false}\n  fixedProp="some-value"\n  onClick={function noRefCheck() {}}\n/>' === '<FakeComponent\n  bool={true}\n  fixedProp="some-value"\n  onClick={function noRefCheck() {}}\n/>'
//   Test.fn (index.js:42:5)
//
/* eslint-enable max-len */

import test from "ava"

import React from "react"

import { noop, renderJSX, JSX } from "../index.js"

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
function FakeComponent() {}

import FunctionalComponentToTest from "./fixtures/fn.js"
import ClassComponentToTest from "./fixtures/class.js"

test("Can render & test a functional component", (t) => {
  const actual = renderJSX(
    <FunctionalComponentToTest bool />
  )
  const expected = JSX(
    <FakeComponent
      fixedProp={ "some-value" }
      bool
    />
  )

  t.deepEqual(actual, expected)
})

test("Can render & test a class component", (t) => {
  const actual = renderJSX(
    <ClassComponentToTest bool />
  )

  // not that the order of the props you expect and the one that are rendered
  // does not matter, since the JSX method handle the order,
  // thanks to react-element-to-jsx-string
  const expected = JSX(
    <FakeComponent
      onClick={ noop }
      clicked={ false }
      bool
      fixedProp={ "some-value" }
    />
  )

  t.deepEqual(actual, expected)
})

test("Can render & test a class component with a state and an event", (t) => {
  const actual = renderJSX(
    <ClassComponentToTest bool />,

    // I think it's interesting here to have to mock an event.
    // This way your tests will explicitely contain what event properties you
    // are using.
    (render) => render.props.onClick({ preventDefault: noop })
  )
  const expected = JSX(
    <FakeComponent
      fixedProp={ "some-value" }
      onClick={ noop }
      clicked
      bool
    />
  )

  t.deepEqual(actual, expected)
})

test("Can render & test a class handler on a child", (t) => {
  let clicked = false
  const click = () => {
    clicked = true
  }

  const child = <div onClick={ click }>{ "ClickMe" }</div>
  const actual = renderJSX(
    <ClassComponentToTest>
      { child }
    </ClassComponentToTest>,

    (render) => {
      render.props.children.props.onClick()
    }
  )

  const expected = JSX(
    <FakeComponent
      fixedProp={ "some-value" }
      onClick={ noop }
      clicked={ false }
    >
      { child }
    </FakeComponent>
  )

  t.is(clicked, true)
  t.deepEqual(actual, expected)
})
