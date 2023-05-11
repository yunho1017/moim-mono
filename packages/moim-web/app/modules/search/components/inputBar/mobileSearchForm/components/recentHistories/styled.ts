import styled from "styled-components";
import { B2Regular, B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import {
  noScrollBarStyle,
  useScrollStyle,
} from "common/components/designSystem/styles";
import ChipBase from "common/components/chips";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled(B2Regular)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${px2rem(10)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const ClearAllButton = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey400};
`;

export const ListWrapper = styled.div`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)};
  position: relative;
`;

export const List = styled.div`
  width: 100%;
  ${useScrollStyle};
  ${noScrollBarStyle};
  overflow-x: scroll;
  display: flex;
  flex-wrap: no-wrap;
  gap: ${px2rem(8)};
`;

export const History = styled(ChipBase).attrs({ role: "button" })`
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey200};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
