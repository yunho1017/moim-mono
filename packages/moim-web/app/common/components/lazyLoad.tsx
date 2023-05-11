import * as React from "react";
import { useInView, IntersectionOptions } from "react-intersection-observer";
import { isServer } from "../helpers/envChecker";

interface IProps extends React.PropsWithChildren<IntersectionOptions> {
  onVisible?: VoidFunction;
  height?: number | string;
  width?: number | string;
  placeholder?: React.ReactNode;
}

function LazyLoad({
  onVisible,
  children,
  width = "100%",
  height = "100%",
  placeholder,
  ...options
}: IProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    ...options,
  });
  const style = React.useMemo(() => ({ width, height }), [width, height]);
  React.useLayoutEffect(() => {
    if (inView && onVisible) {
      onVisible();
    }
  }, [inView, onVisible]);
  return isServer() || inView ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <div ref={ref} style={style}>
      {placeholder}
    </div>
  );
}

export default React.memo(LazyLoad);
