import { createRenderer } from "react-addons-test-utils"
import reactElementToJSXString from "react-element-to-jsx-string"

export function noop() {}

export const JSX = reactElementToJSXString

export const render = (jsx, cb = noop, context) => {
  if (typeof cb === "object") {
    context = cb
    cb = noop
  }
  const renderer = createRenderer()
  const render = renderer.render(jsx, context)

  // here you can execute whatever you want on the renderer
  // eg: (render) => render.props.onClick({ preventDefault: noop })
  cb(render, renderer)

  return renderer.getRenderOutput()
}

export const renderJSX = (...args) => JSX(render(...args))
