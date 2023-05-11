import styled, { css } from "styled-components";
import { rgba } from "polished";
import BigDeleteIcon from "@icon/36-delete.svg";
import LinkIcon from "@icon/18-link-g.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`;

export const DeleteButtonWrapper = styled.div<{
  isSmallDeleteButton?: boolean;
}>`
  position: absolute;
  z-index: ${props => props.theme.zIndexes.wrapper};
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  top: 0;
  right: 0;
  background-color: ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.4)};
  border-bottom-left-radius: ${px2rem(2)};
`;

export const LinkButtonWrapper = styled.div<{ hasLink: boolean }>`
  position: absolute;
  z-index: ${props => props.theme.zIndexes.wrapper};
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  top: ${px2rem(42)};
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.hasLink
      ? props.theme.color.blue900
      : props.theme.colorV2.colorSet.grey300};

  ::before {
    content: "";
    position: absolute;
    width: ${px2rem(36)};
    height: ${px2rem(36)};
    top: 0;
    right: 0;
    background-color: #1a1f23; // fixed color
    opacity: 0.4;
    z-index: ${props => props.theme.zIndexes.below};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    :hover {
      background-color: ${props =>
        props.hasLink
          ? rgba(props.theme.color.blue900, 0.6)
          : rgba(props.theme.colorV2.colorSet.grey300, 0.6)};
    }
  }
`;

export const DeleteButton = styled(BigDeleteIcon).attrs({
  role: "button",
  size: "m",
})``;
export const LinkButton = styled(LinkIcon).attrs(props => ({
  role: "button",
  size: "xs",
  touch: 36,
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;

export const ImageWrapperStyle = css`
  width: 100%;
`;
