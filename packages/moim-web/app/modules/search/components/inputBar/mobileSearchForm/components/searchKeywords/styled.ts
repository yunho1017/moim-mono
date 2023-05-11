import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B2Regular } from "common/components/designSystem/typos";
import ChipBase from "common/components/chips";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled(B2Regular)`
  width: 100%;
  padding: ${px2rem(10)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const KeywordList = styled.div`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)};
  display: flex;
  flex-wrap: wrap;
  gap: ${px2rem(8)};
`;

export const Keyword = styled(ChipBase).attrs({ role: "button" })`
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;
