import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1Regular,
  H2Bold,
  B4Regular,
} from "common/components/designSystem/typos";
import {
  useHoverStyle,
  useScrollStyle,
} from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Contents = styled.div`
  flex: 1;
  ${useScrollStyle};
`;

export const MainTitle = styled(H2Bold)`
  padding: ${px2rem(16)} ${px2rem(16)} ${px2rem(38)};
`;

export const Section = styled.section<{ hover?: boolean }>`
  padding-bottom: ${px2rem(24)};

  ${props => props.hover && useHoverStyle};
`;

export const Title = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(11)} ${px2rem(16)};
`;

export const Description = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: 0 ${px2rem(16)};
`;
