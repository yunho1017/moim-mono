import styled from "styled-components";
import CloseIconBase from "@icon/24-close-b.svg";
import NoRightIconBase from "@icon/18-rights-g.svg";

import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const NoRightIcon = styled(NoRightIconBase).attrs({
  size: "xs",
  touch: 24,
})``;

export const NoRightIconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: ${px2rem(24)};

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const DialogWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(455)};
  }
`;
