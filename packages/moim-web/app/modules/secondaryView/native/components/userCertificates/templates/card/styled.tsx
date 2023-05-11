import styled from "styled-components";
import { H8Bold, H4Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import RetryIconBase from "@icon/24-retry-g.svg";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(12)};
  padding: ${px2rem(24)} ${px2rem(16)};
`;

export const HeaderTitle = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};

  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const AppBarTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const RetryIcon = styled(RetryIconBase).attrs(props => ({
  size: "s",
  role: "button",
  iconColor: props.theme.colorV2.colorSet.fog800,
}))``;
