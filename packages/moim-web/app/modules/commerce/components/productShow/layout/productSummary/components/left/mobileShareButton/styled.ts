import styled from "styled-components";
import { rgba } from "polished";
import ShareIconBase from "@icon/24-share-1.svg";
import { useHoverStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const ShareIcon = styled(ShareIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const ShareButton = styled.button`
  position: absolute;
  right: ${px2rem(16)};
  bottom: ${px2rem(16)};

  width: ${px2rem(36)};
  height: ${px2rem(36)};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.7)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useHoverStyle}
  }
`;
