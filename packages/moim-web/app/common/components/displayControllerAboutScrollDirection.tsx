import * as React from "react";
import styled, { css, FlattenInterpolation } from "styled-components";

import useScrollDirection from "common/hooks/useScrollDirection";
import useIsMobile from "common/hooks/useIsMobile";

const WrapperBase = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  ${props => props.overrideStyle};
`;

const Wrapper = styled(WrapperBase)<{
  direction: "up" | "down";
  overrideStyle?: FlattenInterpolation<any>;
}>`
  transition: transform 300ms;
  ${props =>
    props.direction === "down" &&
    css`
      transform: translate(0, -50vh);
      height: 0;
    `}
`;

type IProps<T> = {
  overrideStyle?: FlattenInterpolation<T>;
  disabled?: boolean;
  onChangeDirection?(dir: "up" | "down"): void;
} & T;

export default function DisplayControllerAboutScrollDirection<T>({
  overrideStyle,
  disabled,
  children,
  onChangeDirection,
  ...props
}: React.PropsWithChildren<IProps<T>>) {
  const direction = useScrollDirection({ initialDirection: "up" });
  const isMobile = useIsMobile();

  React.useLayoutEffect(() => {
    onChangeDirection?.(direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  if (!isMobile || disabled) {
    if (overrideStyle) {
      return (
        <WrapperBase overrideStyle={overrideStyle} {...props}>
          {children}
        </WrapperBase>
      );
    }
    return <>{children}</>;
  }

  return (
    <Wrapper direction={direction} overrideStyle={overrideStyle} {...props}>
      {children}
    </Wrapper>
  );
}
