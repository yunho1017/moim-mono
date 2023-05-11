// vendor
import styled, { css } from "styled-components";

import { Wrapper as ChannelWrapper } from "common/components/channelList/components/channelItem/styled";
import { Wrapper as CategoryWrapper } from "common/components/channelList/components/withCategory/styled";
import { Spacer as SpacerBase } from "common/components/designSystem/spacer";
// helper
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";

export const FIXED_SIDE_BAR_WIDTH = "230px";

export const Spacer = styled(SpacerBase)`
  ${props =>
    props.theme.getSideAreaElementPalette("background").color ===
      "rgba(255,255,255,1.00)" &&
    css`
      border-right: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50};
    `}
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${FIXED_SIDE_BAR_WIDTH};
  height: 100%;
  min-height: 0;
  z-index: ${props => props.theme.zIndexes.default};
  overflow: hidden;
  background-color: ${props =>
    props.theme.getSideAreaElementPalette("background").color};
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
`;

export const Body = styled.div`
  flex: 1;
  position: relative;

  ${props =>
    props.theme.getSideAreaElementPalette("background").color ===
      "rgba(255,255,255,1.00)" &&
    css`
      border-right: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50};
    `}

  & > ${ChannelWrapper} + ${CategoryWrapper} {
    padding-top: ${px2rem(18)};
  }


  ${useScrollStyle}
`;

export const HeaderWrapper = styled.header``;

export const FooterWrapper = styled.div`
  width: 100%;
  padding-top: ${px2rem(8)};
`;
export const BottomWrapper = styled.footer`
  background-color: ${props =>
    props.theme.getSideAreaElementPalette("menuText").fog50};
  width: 100%;

  ${props =>
    props.theme.getSideAreaElementPalette("background").color ===
      "rgba(255,255,255,1.00)" &&
    css`
      border-right: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50};
    `}
`;

export const DmWrapper = styled.div``;
