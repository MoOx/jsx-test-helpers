# jsx-test-helpers

[![Unix Build status](https://img.shields.io/travis/MoOx/jsx-test-helpers/master.svg?branch=master&label=unix%20build)](https://travis-ci.org/MoOx/jsx-test-helpers)
[![Code Coverage](https://img.shields.io/coveralls/MoOx/jsx-test-helpers/master.svg)](https://coveralls.io/github/MoOx/jsx-test-helpers)
[![Version](https://img.shields.io/npm/v/jsx-test-helpers.svg)](https://github.com/MoOx/jsx-test-helpers/blob/master/CHANGELOG.md)

[![Repo on GitHub](https://img.shields.io/badge/repo-GitHub-3D76C2.svg)](https://github.com/MoOx/jsx-test-helpers)
[![Repo on GitLab](https://img.shields.io/badge/repo-GitLab-6C488A.svg)](https://gitlab.com/MoOx/jsx-test-helpers)
[![Repo on BitBucket](https://img.shields.io/badge/repo-BitBucket-1F5081.svg)](https://bitbucket.org/MoOx/jsx-test-helpers)

> Helpers to easily write tests for React component/JSX code

This package [is very small](src/index.js) and provide simple helpers to easily use [React shallow rendering](http://facebook.github.io/react/docs/test-utils.html#shallow-rendering) method in conjonction with [react-element-to-jsx-string](https://github.com/algolia/react-element-to-jsx-string) to write straighforward tests for React component.

**⚠️ [Be sure to read the test file, which is annotated](src/__tests__/index.js) 😙.**

## Installation

```console
$ npm install jsx-test-helpers
```

## Usage

**⚠️ [Be sure to read the test file, which have more complete annotated examples](src/__tests__/index.js).**

Example with [AVA](https://github.com/sindresorhus/ava):

```js
import test from "ava"
import React from "react"
import { noop, renderJSX, JSX } from "jsx-test-helpers"

import FunctionalComponentToTest from "../your-component"

function FakeComponent() {} // fixture

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
```

---

## CONTRIBUTING

* ⇄ Pull/Merge requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull/Merge requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)
