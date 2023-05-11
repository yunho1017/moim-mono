import styled from "styled-components";
import { px2rem } from "app/common/helpers/rem";
import { B4Regular } from "common/components/designSystem/typos";
import { useOpacityHoverStyle } from "common/components/designSystem/styles";

export const BADGE_WIDTH = 68;
export const BADGE_HEIGHT = 106;
export const ICON_HOLDER_SIZE = 64;
export const ICON_SIZE = 36;

export const BadgeWrapper = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${px2rem(BADGE_WIDTH)};
  height: ${px2rem(BADGE_HEIGHT)};
  padding: ${px2rem(2)};
`;

export const IconHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${px2rem(ICON_HOLDER_SIZE)};
  height: ${px2rem(ICON_HOLDER_SIZE)};

  border-radius: 50%;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  margin-bottom: ${px2rem(6)};
  ${useOpacityHoverStyle}
`;

export const BadgeIcon = styled.img`
  width: ${px2rem(ICON_SIZE)};
  height: ${px2rem(ICON_SIZE)};
`;

export const NameWrapper = styled.div`
  width: 100%;
  margin: 0 ${px2rem(4)};
`;

export const Name = styled(B4Regular)`
  width: 100%;
  min-height: ${px2rem(32)};
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey600};

  span {
    word-break: keep-all !important;
  }
`;
