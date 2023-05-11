import styled from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import { BaseItemCell } from "common/components/itemCell";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div``;

export const Title = styled(H8Bold)`
  margin-left: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Header = styled(BaseItemCell).attrs({ size: "s" })`
  padding: 0;
`;

export const PositionList = styled.ol`
  padding: 0 ${px2rem(16)};
`;
