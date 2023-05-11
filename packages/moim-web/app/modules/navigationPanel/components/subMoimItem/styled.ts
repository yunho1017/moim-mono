// vendor
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useHoverStyle } from "common/components/designSystem/styles";
import { B3Regular, B4Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div<{ isSimple: boolean; useHover: boolean }>`
  width: 100%;
  height: ${px2rem(64)};
  padding: ${px2rem(8)} ${px2rem(16)};
  display: flex;
  align-items: center;

  ${props => !props.isSimple && props.useHover && useHoverStyle}
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  margin-left: ${px2rem(12)};
  & > * + * {
    margin-top: ${px2rem(2)};
  }
`;

export const Title = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SubTitle = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
