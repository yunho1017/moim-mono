import * as React from "react";
import styled from "styled-components";
import ViewMoreIconBase from "@icon/24-rightarrow-w.svg";
import MobileViewMore from "./mobile";
import { px2rem } from "common/helpers/rem";

const ViewMoreContainer = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: ${px2rem(16)};
`;

const ViewMoreIcon = styled(ViewMoreIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

interface IProps {
  textKey?: string;
  onClick(): void;
}
export const ViewMore: React.FC<IProps> = React.memo(function({ onClick }) {
  return (
    <ViewMoreContainer role="button" onClick={onClick}>
      <ViewMoreIcon />
    </ViewMoreContainer>
  );
});

export { MobileViewMore };
