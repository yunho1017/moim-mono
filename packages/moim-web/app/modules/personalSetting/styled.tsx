import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  H4BoldStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

export const LEFT_WIDTH = 230;
export const LAYOUT_BETWEEN_GAP = 16;

export const SettingPageInfoWrapper = styled.div`
  margin: 0 ${px2rem(16)};
`;
export const SettingPageTitle = styled.div`
  ${H4BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  padding: ${px2rem(10)} 0;
`;
export const SettingPageDescription = styled.div`
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding-bottom: ${px2rem(16)}
`;

export const SettingMenuWrapperStyle = css`
  position: sticky;
  top: ${px2rem(10)};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-right: ${px2rem(16)};
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${px2rem(24)};
`;

export const ContentsWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(1200)};
    margin: ${px2rem(24)} auto 0;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;
