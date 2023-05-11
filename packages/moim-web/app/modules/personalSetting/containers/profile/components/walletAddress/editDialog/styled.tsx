import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import CloseIconBase from "@icon/24-close-b.svg";
import RetryIconBase from "@icon/24-retry-g.svg";

export const Wrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    min-width: ${px2rem(455)};
    padding: 0 ${px2rem(24)} ${px2rem(20)};
  }
`;

export const AppBarWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(4)} ${px2rem(0)};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const LeftButtonWrapper = styled(ButtonWrapper)`
  margin-left: ${px2rem(13)};
`;

export const RightButtonWrapper = styled(ButtonWrapper)`
  margin-right: ${px2rem(13)};
`;

export const CloseButton = styled(CloseIconBase).attrs({
  size: "s",
  touch: 24,
  role: "button",
})``;

export const RetryIcon = styled(RetryIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.fog800,
  role: "button",
}))``;
