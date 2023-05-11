import styled, { FlattenInterpolation, css } from "styled-components";
import {
  TextButton,
  GhostButton,
} from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const MOBILE_HEADER_HEIGHT = 44;
export const DESKTOP_HEADER_HEIGHT = 48;

export const Wrapper = styled.div<{ wrapperStyle?: FlattenInterpolation<any> }>`
  width: 100%;
  padding-right: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
  display: flex;
  align-items: center;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(DESKTOP_HEADER_HEIGHT)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(MOBILE_HEADER_HEIGHT)};
  }

  ${props => props.wrapperStyle};
`;

export const ButtonWrapper = styled.div`
  & + & {
    margin-left: ${px2rem(8)};
  }
`;

export const DiscardButton = styled(TextButton)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const DraftButton = styled(TextButton)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const DraftSaveButton = styled(GhostButton)``;

export const RightWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const appBarStyle = (postShowModalView: boolean) => {
  if (postShowModalView) {
    return css`
      border-top-right-radius: ${px2rem(8)};
      border-top-left-radius: ${px2rem(8)};
    `;
  }
};
