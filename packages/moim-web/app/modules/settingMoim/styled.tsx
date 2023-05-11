import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { FlatButton } from "common/components/designSystem/buttons";
import { B1RegularStyle } from "common/components/designSystem/typos";

export const LEFT_WIDTH = 230;
export const LAYOUT_BETWEEN_GAP = 16;
export const RIGHT_WIDTH = 455;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

export const RightWrapper = styled.div`
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${px2rem(16)} 0;
  padding: 0 ${px2rem(16)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin: ${px2rem(16)} 0 ${px2rem(56)};
  }
`;

export const ProposeButton = styled(FlatButton).attrs({ size: "l" })`
  flex: 1;
  margin-right: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  color: ${props => props.theme.colorV2.primary.main};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.primary.main};
`;

export const ExecuteButton = styled(FlatButton).attrs({ size: "l" })`
  flex: 1;
`;

export const descriptionTextAreaStyle = css`
  min-height: ${px2rem(66)};
  padding: ${px2rem(16)} 0;
  border: 0;
  box-sizing: content-box;
  outline: 0;
  resize: none;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B1RegularStyle}
`;

export const SettingMenuWrapper = styled.div<{ isOpenBanner: boolean }>`
  position: sticky;
  top: ${props => (props.isOpenBanner ? px2rem(55) : px2rem(10))};
`;
