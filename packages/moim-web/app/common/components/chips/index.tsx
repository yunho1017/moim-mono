import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// components
import { ChipShape, ChipSize, Wrapper, IWrapperProps } from "./styled";

export interface IRefHandler {
  self: React.RefObject<HTMLDivElement>;
}

export type IProps = React.PropsWithChildren<
  {
    shape: ChipShape;
    size: ChipSize;
    selected?: boolean;
    // Note: 삭제해야됨
    overrideStyle?: FlattenInterpolation<any>;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  } & Omit<
    React.DetailedHTMLProps<
      React.BaseHTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "ref"
  >
>;

const ChipBase = React.forwardRef<IRefHandler, IProps>(
  (
    {
      shape,
      size,
      overrideStyle,
      className,
      selected,
      children,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const refThis = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      self: refThis,
    }));

    return (
      <Wrapper
        role={onClick ? "button" : undefined}
        ref={refThis}
        tabIndex={0}
        data-selected={Boolean(selected)}
        shape={shape}
        size={size}
        overrideStyle={overrideStyle}
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Wrapper>
    );
  },
);

export default ChipBase;
export { ChipShape, ChipSize, IWrapperProps };
