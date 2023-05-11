import { Function1 } from "lodash";
import * as React from "react";

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function useRegisterWindowResizeCallback(
  func: Function1<{ width: number; height: number }, void>,
): void {
  React.useLayoutEffect(() => {
    function updateSize() {
      func({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
}

export { useWindowSize, useRegisterWindowResizeCallback };
