import ReactShallowRenderer from "react-test-renderer/shallow";
import reactElementToJSXString from "react-element-to-jsx-string";

export function noop() {}

export const JSX = reactElementToJSXString;

type cbType = (render: Object, renderer: Object) => void;

export const render = (jsx: Object, cb?: cbType | Object, context?: Object) => {
  if (typeof cb === "object") {
    context = cb;
    cb = undefined;
  }
  const renderer = new ReactShallowRenderer();
  const render = renderer.render(jsx, context);

  // here you can execute whatever you want on the renderer
  // eg: (render) => render.props.onClick({ preventDefault: noop })
  if (typeof cb === "function") {
    cb(render, renderer);
  }

  return renderer.getRenderOutput();
};

export const renderJSX = (
  jsx: Object,
  cb?: cbType | Object,
  context?: Object
) => JSX(render(jsx, cb, context));
