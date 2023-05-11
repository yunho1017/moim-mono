import styled from "styled-components";
import { B1Regular, B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div<{
  rightPadding?: number;
}>`
  display: flex;
  flex-direction: column;
  padding-right: ${props =>
    props.rightPadding ? px2rem(props.rightPadding) : 0};
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${px2rem(16)};
`;

export const Title = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Description = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const IconWrapper = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  margin-right: ${px2rem(12)};
`;

export const WithIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
