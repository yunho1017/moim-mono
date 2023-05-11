// vendor
import * as React from "react";
// component
import { Wrapper, Item } from "./styled";
// type
import { ILeftProps } from "./type";

export interface IProps extends ILeftProps {
  touchArea: number;
}
export default function Left({
  touchArea,
  leftContentsSize: itemSize,
  margin,
  onClick,
  children,
}: React.PropsWithChildren<IProps>) {
  return (
    <Wrapper
      touchArea={touchArea}
      leftContentsSize={itemSize}
      margin={margin}
      onClick={onClick}
    >
      <Item>{children}</Item>
    </Wrapper>
  );
}
