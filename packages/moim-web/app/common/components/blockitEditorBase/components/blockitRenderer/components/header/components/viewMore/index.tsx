import * as React from "react";
import styled from "styled-components";
import ViewMoreIconBase from "@icon/24-arrow-g.svg";
import MobileViewMore from "./mobile";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../../../helper/blockitStyleHelpers";

const ViewMoreContainer = styled.div<{ padding?: Moim.Blockit.IBlockitMargin }>`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: ${px2rem(16)};
  ${props => marginToPadding(props?.padding)};
`;

const ViewMoreIcon = styled(ViewMoreIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

interface IProps {
  padding?: Moim.Blockit.IBlockitMargin;
  textKey?: string;
  onClick?(): void;
}

export const ViewMore: React.FC<IProps> = React.memo(function({
  onClick,
  padding,
}) {
  return (
    <ViewMoreContainer role="button" onClick={onClick} padding={padding}>
      <ViewMoreIcon />
    </ViewMoreContainer>
  );
});

export { MobileViewMore };
