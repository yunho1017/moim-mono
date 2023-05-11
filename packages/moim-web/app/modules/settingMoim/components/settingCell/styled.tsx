import styled from "styled-components";
import { B4Regular, H8Bold } from "common/components/designSystem/typos";
import { DefaultDivider } from "common/components/divider";
import { px2rem } from "common/helpers/rem";
import { SETTING_HORIZONTAL_MARGIN } from "../../constants";

export const Wrapper = styled.div`
  margin: 0 ${px2rem(SETTING_HORIZONTAL_MARGIN)};
  padding-bottom: ${px2rem(16)};
`;

export const Container = styled.div``;

export const Title = styled(H8Bold)`
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(1)} 0;
`;

export const Description = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-bottom: ${px2rem(8)};
`;

export const Divider = styled(DefaultDivider)`
  margin-top: ${px2rem(16)};
`;
