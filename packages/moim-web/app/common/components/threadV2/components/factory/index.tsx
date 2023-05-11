import * as React from "react";
import { Wrapper, Left, Right, Row, HoverMenu } from "./styled";
import { HoverSelectedStyleWrapper } from "common/components/designSystem/styles";

export { Row };
export type THREAD_V2_TYPE = "message" | "comment" | "review" | "question";

interface IProps {
  type: THREAD_V2_TYPE;
  size?: Moim.DesignSystem.Size;
  avatar?: React.ReactNode;
  header?: React.ReactNode;
  hover?: boolean;
  selected?: boolean;
  reverse?: boolean;
  menus?: React.ReactNode[];
  isAnonymous?: boolean;
  isFullWidthRight?: boolean;
  disableHoverStyle?: boolean;
}

export default React.forwardRef<
  HTMLDivElement | null,
  React.PropsWithChildren<IProps>
>(
  (
    {
      type,
      size,
      avatar,
      header,
      hover = true,
      selected,
      reverse,
      menus,
      isAnonymous,
      isFullWidthRight,
      disableHoverStyle,
      children,
    },
    ref,
  ) => {
    const refSelf = React.useRef(null);

    React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => refSelf.current,
    );

    return (
      <HoverSelectedStyleWrapper
        hover={!disableHoverStyle ? hover : undefined}
        selected={selected}
      >
        <Wrapper
          ref={refSelf}
          type={type}
          size={size}
          reverse={reverse}
          isAnonymous={isAnonymous}
          isFullWidth={isFullWidthRight}
        >
          {!reverse && type !== "question" && <Left>{avatar}</Left>}
          <Right>
            {header && <Row reverse={reverse}>{header}</Row>}
            {children}
          </Right>
          {menus && <HoverMenu hover={hover}>{menus}</HoverMenu>}
        </Wrapper>
      </HoverSelectedStyleWrapper>
    );
  },
);
