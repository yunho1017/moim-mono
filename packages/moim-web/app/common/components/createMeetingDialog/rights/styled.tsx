import styled, { css } from "styled-components";
import {
  B1RegularStyle,
  B4Regular,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const CollapseBoxHeaderStyle = css`
  padding: 0 ${px2rem(24)};
`;

export const CollapseBoxInnerWrapper = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  border-top: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  padding: 0 ${px2rem(16)} ${px2rem(12)};
`;

export const InnerSettingInputWrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const FieldDescription = styled(B4Regular)<{ open?: boolean }>`
  color: ${props => props.theme.colorV2.colorSet.grey200};

  margin-bottom: ${({ open }) => (open ? px2rem(8) : 0)};
`;

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Title = styled.div<{ isOpen: boolean }>`
  ${B1RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${props =>
    props.isOpen
      ? css`
          font-weight: ${props.theme.font.bold};
        `
      : null};
`;
