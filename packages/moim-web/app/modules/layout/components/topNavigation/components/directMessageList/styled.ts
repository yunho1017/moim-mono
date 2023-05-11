import styled, { css } from "styled-components";
import { H10Bold } from "common/components/designSystem/typos";
import AddIconBase from "@icon/18-add-g.svg";
import { px2rem } from "common/helpers/rem";

import { useScrollStyle } from "common/components/designSystem/styles";

export const TitleWrapper = styled.div`
  width: 100%;
  height: ${px2rem(44)};
  display: flex;
  align-items: center;
  margin-top: ${px2rem(4)};
  padding: 0 ${px2rem(4)} 0 ${px2rem(16)};
  position: sticky;
  top: 0;

  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

export const Title = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  flex: 1;
  min-width: 0;
`;

export const AddIcon = styled(AddIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const paperOverrideStyle = css`
  width: ${px2rem(230)};
`;

export const Inner = styled.div`
  position: relative;
  max-height: ${px2rem(700)};
  ${useScrollStyle}
`;
