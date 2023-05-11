import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

import { B2Regular } from "common/components/designSystem/typos";
import { BG_LEVEL_BACKGROUND_CLASS_NAME } from "common/components/designSystem/BGLevel";

const INPUT_BOTTOM_PAD = 23;

export const ThreadInputWrapper = styled.div.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})`
  width: 100%;
  padding: 0 ${px2rem(16)} ${px2rem(INPUT_BOTTOM_PAD)};
`;

export const NoRightTextWrapper = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  height: ${px2rem(44)};
  line-height: ${px2rem(44)};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

export const BackgroundLayer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;
