import * as React from "react";
import { Wrapper, Left, Right } from "./styled";

export interface IProps {
  minHeight?: number;
  disableListWrapperRightBorder?: boolean;
  listWrapperWidth?: number;
  detailElement: React.ReactNode;
  listElement?: React.ReactNode;
  disableDetailWrapperBorder?: boolean;
}

const DesktopLayout: React.FC<IProps> = ({
  detailElement,
  listElement,
  listWrapperWidth,
  minHeight,
  disableListWrapperRightBorder,
  disableDetailWrapperBorder = false,
}) => (
  <Wrapper minHeight={minHeight}>
    {listElement && (
      <Left
        width={listWrapperWidth}
        disableRightBorder={disableListWrapperRightBorder}
      >
        {listElement}
      </Left>
    )}
    <Right disableDetailWrapperBorder={disableDetailWrapperBorder}>
      <div>{detailElement}</div>
    </Right>
  </Wrapper>
);

export default React.memo(DesktopLayout);
