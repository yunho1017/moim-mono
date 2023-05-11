import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular, H8Bold } from "common/components/designSystem/typos";
import { useScrollStyle } from "common/components/designSystem/styles";
import CloseIcon from "@icon/24-close-b.svg";

export const AppBarWrapperStyle = css`
  margin-top: ${px2rem(8)};
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${useScrollStyle};
`;

export const TabContentWrapper = styled.div`
  flex: 1;
  height: 100%;
  padding: ${px2rem(12)} ${px2rem(24)} 0;

  &:nth-child(1) {
    padding-top: ${px2rem(22)};
  }

  ${useScrollStyle};
`;

export const EmptyWrapper = styled(B1Regular)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const EmptyEmoji = styled.span`
  font-size: ${px2rem(80)};
  line-height: 1.13;
`;

export const EmptyTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin: ${px2rem(8)} 0 ${px2rem(12)};
`;

export const CloseButton = styled(CloseIcon).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;
