import styled, { FlattenInterpolation } from "styled-components";
import { B2Regular } from "app/common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../helper/blockitStyleHelpers";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const HeaderWrapper = styled.div`
  width: 100%;
`;
export const ListWrapper = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100%;
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const EmptyEmojiWrapper = styled.div`
  width: ${px2rem(80)};
  height: ${px2rem(120)};
  font-size: ${px2rem(80)};
  line-height: 1.5;
`;
export const EmptyMessage = styled(B2Regular)`
  margin: ${px2rem(16)};
  text-align: center;
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
